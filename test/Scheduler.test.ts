import Scheduler from '../src/Scheduler';
import DataReader from "../src/DataReader";

describe('Scheduler Tests', () => {

  it('First timetable test', () => {
    const expectedResult = DataReader('data/output1.txt')[0];
    const input = DataReader('data/input1.txt');
    expect(new Scheduler(input).firstAvailableTimeSlot()).toEqual(expectedResult)
  })

  it('Second timetable test', () => {
    const expectedResult = DataReader('data/output2.txt')[0];
    const input = DataReader('data/input2.txt');
    expect(new Scheduler(input).firstAvailableTimeSlot()).toEqual(expectedResult)
  })

  it('Third timetable test', () => {
    const expectedResult = DataReader('data/output3.txt')[0];
    const input = DataReader('data/input3.txt');
    expect(new Scheduler(input).firstAvailableTimeSlot()).toEqual(expectedResult)
  })

  it('Fourth timetable test', () => {
    const expectedResult = DataReader('data/output4.txt')[0];
    const input = DataReader('data/input4.txt');
    expect(new Scheduler(input).firstAvailableTimeSlot()).toEqual(expectedResult)
  })

  it('Fifth timetable test', () => {
    const expectedResult = DataReader('data/output5.txt')[0];
    const input = DataReader('data/input5.txt');
    expect(new Scheduler(input).firstAvailableTimeSlot()).toEqual(expectedResult)
  })

});