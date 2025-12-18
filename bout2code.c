#include <arpa/inet.h>
#include <netdb.h>
#include <netinet/in.h>
#include <poll.h>
#include <ctype.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#include "common.h"
#include "msg_struct.h"

int send_message(int file_descriptor, struct message *msgstruct, const char *payload);
int handle_connect(const char *client_ip, int client_port);
void handle_client_input(char *input_buffer, struct pollfd *file_descriptor_set, int server_file_descriptor, char *client_nickname);
void handle_server_message(char *recv_buffer, struct pollfd *file_descriptor_set, int server_file_descriptor);
void send_file_request(int server_file_descriptor, const char *receiver_nick, const char *file_name_arg);
void handle_file_request(int server_file_descriptor, struct message *msgstruct, const char *payload);
void send_file_accept(int server_file_descriptor, struct message *message);
void send_file_reject(int server_file_descriptor, const char *sender_nick);
void handle_file_accept(int server_file_descriptor, struct message *msgstruct);
void send_file_to_receiver(const char *ip, int port, const char *file_name);
void start_file_server(int port);
void receive_file(int conn_fd);
void send_file_ack(int conn_fd, const char *file_name);



// Variable pour savoir si le client a rejoint un canal
int channel_joined = 0;
char client_nickname[NICK_LEN] = "";
char file_name[INFOS_LEN] = "";

int main(int argc, char *argv[]) {
    int server_file_descriptor;
    struct addrinfo hints, *res, *pointerToRes; // hints --> getaddrinfo() --> res
                                                // res --> [addrinfo] -> [addrinfo] -> ... -> [addrinfo] -> NULL
    char *server_ip;
    char *server_port;

    // Récupération des informations du serveur passées en argument
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <server_ip> <server_port>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    server_ip = argv[1];
    server_port = argv[2];

    // Configuration de l'adresse du serveur
    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_UNSPEC; // IPv4 ou IPv6
    hints.ai_socktype = SOCK_STREAM;

    if (getaddrinfo(server_ip, server_port, &hints, &res) != 0) {
        perror("getaddrinfo()");
        exit(EXIT_FAILURE);
    }

    // Connexion au serveur
    // On essaie toutes les adresses possibles retournées par getaddrinfo() 
    for (pointerToRes = res; pointerToRes != NULL; pointerToRes = pointerToRes->ai_next) {
        server_file_descriptor = socket(pointerToRes->ai_family, pointerToRes->ai_socktype, pointerToRes->ai_protocol);
        if (server_file_descriptor < 0) {
            continue;
        }

        if (connect(server_file_descriptor, pointerToRes->ai_addr, pointerToRes->ai_addrlen) == -1) {
            close(server_file_descriptor);
            continue;
        }

        break;
    }

    // Si aucune adresse ne fonctionne
    if (pointerToRes == NULL) {
        fprintf(stderr, "Impossible de se connecter au serveur\n");
        freeaddrinfo(res);
        exit(EXIT_FAILURE);
    }

    freeaddrinfo(res);

    printf("Connecté au serveur %s:%s\n", server_ip, server_port);

    // Variables pour le polling
    struct pollfd file_descriptor_set[2];
    file_descriptor_set[0].fd = STDIN_FILENO; // Entrée standard
    file_descriptor_set[0].events = POLLIN;
    file_descriptor_set[1].fd = server_file_descriptor;    // Socket du serveur
    file_descriptor_set[1].events = POLLIN;

    char input_buffer[BUFFER_SIZE];
    char recv_buffer[BUFFER_SIZE];

    while (1) {
        int poll_count = poll(file_descriptor_set, 2, -1);
        if (poll_count == -1) {
            perror("poll");
            break;
        }

        handle_client_input(input_buffer, file_descriptor_set, server_file_descriptor, client_nickname);

        handle_server_message(recv_buffer, file_descriptor_set, server_file_descriptor);
    }

    close(server_file_descriptor);
    return EXIT_SUCCESS;
}

// Fonction pour envoyer des messages de manière fiable
int send_message(int file_descriptor, struct message *msgstruct, const char *payload) {
    struct message net_msgstruct = *msgstruct;

    // Convertir les champs numériques en ordre d'octets réseau
    net_msgstruct.pld_len = msgstruct->pld_len;
    net_msgstruct.type = msgstruct->type;

    int total_sent = 0;
    int len = sizeof(struct message);
    char *pointer_net_msgstruct = (char *)&net_msgstruct;

    // Envoyer l'en-tête du message
    while (total_sent < len) {
        int sent = write(file_descriptor, pointer_net_msgstruct + total_sent, len - total_sent);
        if (sent <= 0) {
            perror("Erreur lors de l'envoi du message");
            return -1;
        }
        total_sent += sent;
    }

    // Envoyer le payload si nécessaire
    if (ntohl(msgstruct->pld_len) > 0 && payload != NULL) { // ntohl(x) is a macro that converts a 32-bit integer from network byte order to host byte order
        total_sent = 0;
        len = ntohl(msgstruct->pld_len);
        pointer_net_msgstruct = (char *)payload;

        while (total_sent < len) {
            int sent = write(file_descriptor, pointer_net_msgstruct + total_sent, len - total_sent);
            if (sent <= 0) {
                perror("Erreur lors de l'envoi du payload");
                return -1;
            }
            total_sent += sent;
        }
    }
    return 0;
}


int handle_connect(const char *client_ip, int client_port) {
	struct addrinfo hints, *result, *result_pointer;
	int socket_file_descriptor;
	memset(&hints, 0, sizeof(struct addrinfo));
	hints.ai_family = AF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
    // Convertir le port en chaîne de caractères
    char port_str[6];
    snprintf(port_str, sizeof(port_str), "%d", client_port);
	if (getaddrinfo(client_ip, port_str, &hints, &result) != 0) {
		perror("getaddrinfo()");
		exit(EXIT_FAILURE);
	}
    // On essaie toutes les adresses possibles retournées dans result
	for (result_pointer = result; result_pointer != NULL; result_pointer = result_pointer->ai_next) {
		socket_file_descriptor = socket(result_pointer->ai_family, result_pointer->ai_socktype,result_pointer->ai_protocol);
		if (socket_file_descriptor == -1) {
			continue;
		}
		if (connect(socket_file_descriptor, result_pointer->ai_addr, result_pointer->ai_addrlen) != -1) {
			break;
		}
		close(socket_file_descriptor);
	}
	if (result_pointer == NULL) {
		fprintf(stderr, "Could not connect\n");
		exit(EXIT_FAILURE);
	}
	freeaddrinfo(result);
	return socket_file_descriptor;
}
