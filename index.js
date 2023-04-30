/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
};

const createEmployeeRecords = (employeeData) => {
    return employeeData.map((employee) => createEmployeeRecord(employee));
};

const createTimeInEvent = function (punchIn) {
    const [date, hour] = punchIn.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
};

const createTimeOutEvent = function (punchOut) {
    const [date, hour] = punchOut.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
};

const hoursWorkedOnDate = function (dateWorked) {
    const punchIn = this.timeInEvents.find(
        (record) => record.date === dateWorked
    );

    const punchOut = this.timeOutEvents.find(
        (record) => record.date === dateWorked
    );

    return (punchOut.hour - punchIn.hour) / 100;
};

const wagesEarnedOnDate = function (dateWorked) {
    const wagesOweForDay =
        hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour;
    return parseFloat(wagesOweForDay.toString());
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(
        function (memo, d) {
            return memo + wagesEarnedOnDate.call(this, d);
        }.bind(this),
        0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};

const findEmployeeByFirstName = (employeeData, firstName) => {
    return employeeData.find(function (rec) {
        return rec.firstName === firstName;
    });
};

const calculatePayroll = (employeeData) => {
    return employeeData.reduce(
        (total, rec) => total + allWagesFor.call(rec),
        0
    );
};
