type Moment = {
  hour:number;
  minute:number;
}

export default class Scheduler {

  takenSlots : Slot[];

  constructor(input : string[]) {
    this.takenSlots = input.map(line => new Slot(line)).sort((a, b) => (a.formatToString() >= b.formatToString()) ? 1 : -1)
  }

  firstAvailableTimeSlot() : string | null {
    let firstSlot = new Slot('1 08:00-08:59');
    let currentSlotIndex = 0;
    while (firstSlot.formatToString() < '5 17:00-17:59' && currentSlotIndex < this.takenSlots.length) {
      const nexSlot = this.takenSlots[currentSlotIndex];
      if (firstSlot.endsAfterSlotEnds(nexSlot)) {
        if (firstSlot.startsBeforeSlotEnds(nexSlot)) {
          firstSlot.setAMinuteAfterSlot(nexSlot);
        }
        currentSlotIndex = currentSlotIndex + 1;
      } else if (firstSlot.endsBeforeSlotStarts(nexSlot)) {
        return firstSlot.formatToString();
      } else {
        firstSlot.setAMinuteAfterSlot(nexSlot);
        if (firstSlot.pastWorkingHours()) {
          //set to first possible slot for tomorrow
          firstSlot = new Slot((Number(firstSlot.day) + 1) + ' 08:00-08:59')
        }
        currentSlotIndex = currentSlotIndex + 1;
      }
    }

    return null
  }

}


class Slot {

  day : string;
  start: Moment;
  end: Moment;

  constructor(value : string) {
    const content : string[] = value.split(' ');
    const start = content[1].split('-')[0];
    const end = content[1].split('-')[1];
    this.day = content[0];
    this.start = {hour : Number(start.split(':')[0]), minute: Number(start.split(':')[1])};
    this.end = {hour : Number(end.split(':')[0]), minute: Number(end.split(':')[1])};
  }

  setAMinuteAfterSlot(slot : Slot) {
    this.start = slot.end.minute >= 59 ? {hour : slot.end.hour + 1, minute: 0} : {hour : slot.end.hour, minute: slot.end.minute + 1};
    this.end = this.start.minute === 0 ? {hour: this.start.hour , minute: 59} : {hour: this.start.hour + 1 , minute: this.start.minute - 1};
  }

  formatToString() : string {
    return this.day + ' ' +
        (String(this.start.hour).padStart(2, '0') + ':' + String(this.start.minute).padStart(2, '0')) +
        '-' +
        (String(this.end.hour).padStart(2, '0') + ':' + String(this.end.minute).padStart(2, '0'));
  }

  endsBeforeSlotStarts(slot : Slot) : boolean {
    return this.day < slot.day ||
        (this.day ===  slot.day && this.end.hour < slot.start.hour) ||
        (this.day ===  slot.day && this.end.hour === slot.start.hour && this.end.minute < slot.start.minute)
  }

  endsAfterSlotEnds(slot : Slot) : boolean {
    return this.day > slot.day ||
        (this.day === slot.day && this.end.hour > slot.end.hour) ||
        (this.day === slot.day && this.end.hour === slot.end.hour && this.end.minute > slot.end.minute);
  }

  startsBeforeSlotEnds(slot : Slot) : boolean {
    return this.day === slot.day &&
        ((this.start.hour < slot.end.hour) || (this.start.hour === slot.end.hour && this.start.minute <= slot.end.minute));
  }

  pastWorkingHours() : boolean {
    return this.end.hour > 17;
  }
}