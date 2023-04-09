const getAverage = (numbers) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i += 1) {
        sum += numbers[i].rate;
    }
    return Math.ceil(sum / numbers.length);
};

module.exports = {getAverage}