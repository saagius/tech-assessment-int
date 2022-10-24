/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

function getTotalsFromDates(endDate, startDate) {
    // Get Time in milliseconds between dates to bring the difference
    const difference = endDate.getTime() - startDate.getTime();
    // Ceil the amount of milliseconds difference
    // and divide that with
    // (1000 for milliseconds to seconds),
    // (3600 - which is (60 seconds * 60 minutes))
    // (24 hours)
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    let totalYears = 0;
    // Get difference from date months
    let totalMonths = endDate.getMonth() - startDate.getMonth();
    // Add the difference in months from the getFullYear method multiplied by 12 (months)
    totalMonths += 12 * (endDate.getFullYear() - startDate.getFullYear());

    // if total amount of months is bigger or equal from that of a year, 12
    if (totalMonths >= 12) {
        // Get absolute amount of years without any decimals
        totalYears = Math.abs(totalMonths / 12).toFixed(0);
        // From the amount of years, remove the months multiplied by 12, that of a year
        // to get back the remaining months only
        totalMonths = totalMonths - (totalYears * 12);
    }

    const dayOfMonthOfEndDate = endDate.getDate();
    const dayOfMonthOfStartDate = startDate.getDate();
    // Handling of day of months needed to calibrate the flooring of months
    // depending on the start and end dates given
    if(totalMonths > 0 && dayOfMonthOfEndDate < dayOfMonthOfStartDate) {
        totalMonths -= 1;
    }

    return {
        totalYears,
        totalMonths,
        totalDays
    };
}

function formatTotals(totals) {
    const {
        totalYears,
        totalMonths,
        totalDays
    } = totals;

    let output = '';

    if(totalYears > 0) {
        output += `${totalYears} year${totalYears != 1 ? 's' : ''},`;
    }

    if(totalMonths > 0) {
        if(output) {
            output += ' ';
        }

        output += `${totalMonths} month${totalMonths != 1 ? 's' : ''},`
    }

    if(output) {
        output += ' ';
    }

    output += `total ${totalDays} day${totalDays != 1 ? 's' : ''}`;

    return output;
}

function reformatDate(date) {
    const [
      day,
      month,
      year
    ] = date.split('.');

    return `${year}/${month}/${day}`;
}

// Receive string of dates one after each other
function outputDate(dates) {
    // Reformatting each date so that they are detected with a good javascript standard
    const startDate = new Date(reformatDate(dates[0]));
    const endDate = new Date(reformatDate(dates[1]));

    // Get Totals from Dates
    const totals = getTotalsFromDates(endDate, startDate);
    // Formatting Totals depending on values
    const output = formatTotals(totals);
    // Return formatted output
    return output;
}
