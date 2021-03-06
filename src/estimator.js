const covid19ImpactEstimator = (data) => {
  const input = data;
  let days;
  let sets;
  let factor;
  if (input.periodType === 'days') {
    days = input.timeToElapse;
    factor = Math.floor(days / 3);
    sets = 2 ** factor;
  } else if (input.periodType === 'weeks') {
    days = input.timeToElapse * 7;
    factor = Math.floor((days) / 3);
    sets = 2 ** factor;
  } else if (input.periodType === 'months') {
    days = input.timeToElapse * 30;
    factor = Math.floor((days) / 3);
    sets = 2 ** factor;
  }
  const signChecker = (num) => {
    if (num > 0) {
      return Math.floor(num);
    }
    if (num < 0) {
      return Math.ceil(num);
    }
    return null;
  };
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: input.reportedCases * 10 * sets,
      severeCasesByRequestedTime: Math.floor(0.15 * (input.reportedCases * 10 * sets)),
      hospitalBedsByRequestedTime: signChecker((0.35 * input.totalHospitalBeds)
    - Math.floor(0.15 * (input.reportedCases * 10 * sets))),
      casesForICUByRequestedTime: Math.floor(0.05 * (input.reportedCases * 10 * sets)),
      casesForVentilatorsByRequestedTime: Math.floor(0.02 * (input.reportedCases * 10 * sets)),
      dollarsInFlight: Math.floor((input.reportedCases * 10 * sets
       * input.region.avgDailyIncomePopulation
     * input.region.avgDailyIncomeInUSD) / days)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: input.reportedCases * 50 * sets,
      severeCasesByRequestedTime: 0.15 * (input.reportedCases * 50 * sets),
      hospitalBedsByRequestedTime: signChecker((0.35 * input.totalHospitalBeds)
    - Math.floor(0.15 * (input.reportedCases * 50 * sets))),
      casesForICUByRequestedTime: Math.floor(0.05 * (input.reportedCases * 50 * sets)),
      casesForVentilatorsByRequestedTime: Math.floor(0.02 * (input.reportedCases * 50 * sets)),
      dollarsInFlight: Math.floor((input.reportedCases * 50 * sets
      * input.region.avgDailyIncomePopulation
     * input.region.avgDailyIncomeInUSD) / days)
    }
  };
};
// All tests done
export default covid19ImpactEstimator;
