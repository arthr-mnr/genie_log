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

int send_message(int fd, struct message *msgstruct, const char *payload);
int handle_connect(const char *client_ip, int client_port);
void handle_client_input(char *input_buffer, struct pollfd *fds, int server_fd, char *client_nickname);
void handle_server_message(char *recv_buffer, struct pollfd *fds, int server_fd);
void send_file_request(int server_fd, const char *receiver_nick, const char *file_name_arg);
void handle_file_request(int server_fd, struct message *msgstruct, const char *payload);
void send_file_accept(int server_fd, struct message *message);
void send_file_reject(int server_fd, const char *sender_nick);
void handle_file_accept(int server_fd, struct message *msgstruct);
void send_file_to_receiver(const char *ip, int port, const char *file_name);
void start_file_server(int port);
void receive_file(int conn_fd);
void send_file_ack(int conn_fd, const char *file_name);



// Variable pour savoir si le client a rejoint un canal
int channel_joined = 0;
char client_nickname[NICK_LEN] = "";
char file_name[INFOS_LEN] = "";

int main(int argc, char *argv[]) {
    int server_fd;
    struct addrinfo hints, *res, *p;
    char *server_ip;
    char *server_port;

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
    for (p = res; p != NULL; p = p->ai_next) {
        server_fd = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
        if (server_fd < 0) {
            continue;
        }

        if (connect(server_fd, p->ai_addr, p->ai_addrlen) == -1) {
            close(server_fd);
            continue;
        }

        break;
    }

    if (p == NULL) {
        fprintf(stderr, "Impossible de se connecter au serveur\n");
        freeaddrinfo(res);
        exit(EXIT_FAILURE);
    }

    freeaddrinfo(res);

    printf("Connecté au serveur %s:%s\n", server_ip, server_port);

    // Variables pour le polling
    struct pollfd fds[2];
    fds[0].fd = STDIN_FILENO; // Entrée standard
    fds[0].events = POLLIN;
    fds[1].fd = server_fd;    // Socket du serveur
    fds[1].events = POLLIN;

    char input_buffer[BUFFER_SIZE];
    char recv_buffer[BUFFER_SIZE];

    while (1) {
        int poll_count = poll(fds, 2, -1);
        if (poll_count == -1) {
            perror("poll");
            break;
        }

        handle_client_input(input_buffer, fds, server_fd, client_nickname);

        handle_server_message(recv_buffer, fds, server_fd);
    }

    close(server_fd);
    return EXIT_SUCCESS;
}

// Fonction pour envoyer des messages de manière fiable
int send_message(int fd, struct message *msgstruct, const char *payload) {
    struct message net_msgstruct = *msgstruct;

    // Convertir les champs numériques en ordre d'octets réseau
    net_msgstruct.pld_len = msgstruct->pld_len;
    net_msgstruct.type = msgstruct->type;

    int total_sent = 0;
    int len = sizeof(struct message);
    char *ptr = (char *)&net_msgstruct;

    // Envoyer l'en-tête du message
    while (total_sent < len) {
        int sent = write(fd, ptr + total_sent, len - total_sent);
        if (sent <= 0) {
            perror("Erreur lors de l'envoi du message");
            return -1;
        }
        total_sent += sent;
    }

    // Envoyer le payload si nécessaire
    if (ntohl(msgstruct->pld_len) > 0 && payload != NULL) {
        total_sent = 0;
        len = ntohl(msgstruct->pld_len);
        ptr = (char *)payload;

        while (total_sent < len) {
            int sent = write(fd, ptr + total_sent, len - total_sent);
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
	struct addrinfo hints, *result, *rp;
	int sfd;
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
	for (rp = result; rp != NULL; rp = rp->ai_next) {
		sfd = socket(rp->ai_family, rp->ai_socktype,rp->ai_protocol);
		if (sfd == -1) {
			continue;
		}
		if (connect(sfd, rp->ai_addr, rp->ai_addrlen) != -1) {
			break;
		}
		close(sfd);
	}
	if (rp == NULL) {
		fprintf(stderr, "Could not connect\n");
		exit(EXIT_FAILURE);
	}
	freeaddrinfo(result);
	return sfd;
}
