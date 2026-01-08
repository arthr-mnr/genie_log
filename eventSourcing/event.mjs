export class Event {
  constructor(name, accountId, payload, creationDate) {
    this.name = name;
    this.accountId = accountId;
    this.payload = payload;
    this.creationDate = creationDate ?? new Date();
  }
}
