export const userExcelschema = [
  {
    column: 'No.',
    type: Number,
    value: (user) => user.sequenceNo,
  },
  {
    column: 'First Name',
    type: String,
    value: (user) => user.firstName,
  },
  {
    column: 'Last Name',
    type: String,
    value: (user) => user.lastName,
  },
  {
    column: 'Role',
    type: String,
    value: (user) => user.role,
  },
  {
    column: 'Status',
    type: String,
    value: (user) => user.status,
  },
  {
    column: 'Email',
    type: String,
    value: (user) => user.email,
  },
  {
    column: 'Mobile',
    type: String,
    value: (user) => user.mobile,
  },
  {
    column: 'Birthdate',
    type: Date,
    format: 'mm/dd/yyyy',
    value: (user) => user.birthdate,
  },
  {
    column: 'Place of Birth',
    type: String,
    value: (user) => user.placeOfBirth,
  },
  {
    column: 'Province (Permanent Address)',
    type: String,
    value: (user) => user.provincePermanentAddress,
  },
  {
    column: 'City (Permanent Address)',
    type: String,
    value: (user) => user.cityPermanentAddress,
  },
  {
    column: 'Barangay (Permanent Address)',
    type: String,
    value: (user) => user.barangayPermanentAddress,
  },
  {
    column: 'Street (Permanent Address)',
    type: String,
    value: (user) => user.streetPermanentAddress,
  },
  {
    column: 'Zip Code (Permanent Address)',
    type: String,
    value: (user) => user.zipcodePermanentAddress,
  },
  {
    column: 'Province (Current Address)',
    type: String,
    value: (user) => user.provinceCurrentAddress,
  },
  {
    column: 'City (Current Address)',
    type: String,
    value: (user) => user.cityCurrentAddress,
  },
  {
    column: 'Barangay (Current Address)',
    type: String,
    value: (user) => user.barangayCurrentAddress,
  },
  {
    column: 'Street (Current Address)',
    type: String,
    value: (user) => user.streetCurrentAddress,
  },
  {
    column: 'Zip Code (Current Address)',
    type: String,
    value: (user) => user.zipcodeCurrentAddress,
  },
  {
    column: 'Nationalities',
    type: String,
    value: (user) => user.nationalities,
  },
  {
    column: 'Nature of Work',
    type: String,
    value: (user) => user.natureOfWork,
  },
  {
    column: 'Source of Income',
    type: String,
    value: (user) => user.sourceOfIncome,
  },
  {
    column: 'Site',
    type: String,
    value: (user) => user.site,
  },
  {
    column: 'Government Type',
    type: String,
    value: (user) => user.govtType,
  },
  {
    column: 'Government ID',
    type: String,
    value: (user) => user.govtId,
  },
  {
    column: 'isKYC',
    type: String,
    value: (user) => user.isKYC,
  },
  {
    column: 'Created At',
    type: Date,
    format: 'mm/dd/yyyy',
    value: (user) => user.createdAt,
  },
  {
    column: 'Updated At',
    type: Date,
    format: 'mm/dd/yyyy',
    value: (user) => user.updatedAt,
  },
  {
    column: 'Deleted At',
    type: Date,
    format: 'mm/dd/yyyy',
    value: (user) => user.deletedAt,
  },
];

export const trasanctionExcelschema = [
  {
    column: 'Transaction ID',
    type: String,
    value: (transaction) => transaction.transactionId,
  },
  {
    column: 'Operation ID / Ticket No.',
    type: String,
    value: (transaction) => transaction.operationId,
  },
  {
    column: 'Game',
    type: String,
    value: (transaction) => transaction.game,
  },
  {
    column: 'Site',
    type: String,
    value: (transaction) => transaction.site,
  },
  {
    column: 'Date Created',
    type: Date,
    format: 'mm/dd/yyyy',
    value: (transaction) => transaction.createdAt,
  },
  {
    column: 'Match ID',
    type: Number,
    value: (transaction) => transaction.game_id,
  },
  {
    column: 'Transaction Type',
    type: String,
    value: (transaction) => transaction.type,
  },
  {
    column: 'Bet Amt',
    type: String,
    value: (transaction) => transaction.betAmount,
  },
  {
    column: 'Trans. Amt',
    type: String,
    value: (transaction) => transaction.amount,
  },
  {
    column: 'Bet Ball',
    type: String,
    value: (transaction) => transaction.ball,
  },
  {
    column: 'Odds',
    type: String,
    value: (transaction) => transaction.odds,
  },
  {
    column: 'Win Amount',
    type: String,
    value: (transaction) => transaction.winAmount,
  },
  {
    column: 'Lose Amount',
    type: String,
    value: (transaction) => transaction.loseAmount,
  },
  {
    column: 'Service Fee',
    type: String,
    value: (transaction) => transaction.serviceFee,
  },
  {
    column: 'Player',
    type: String,
    value: (transaction) => transaction.playerName,
  },
  {
    column: 'Player Type',
    type: String,
    value: (transaction) => transaction.playerType,
  },
  {
    column: 'Operator/Representative',
    type: String,
    value: (transaction) => transaction.operatorRef,
  },
  {
    column: 'Op/Rep Role',
    type: String,
    value: (transaction) => transaction.operatorRefRole,
  },
  {
    column: 'Op/Rep Type',
    type: String,
    value: (transaction) => transaction.operatorRefType,
  },
];

export const merchantExcelschema = [
  {
    column: 'Transaction ID',
    type: String,
    value: (transaction) => transaction.transactionId,
  },
  {
    column: 'Temporary ID',
    type: String,
    value: (transaction) => transaction.temporaryId,
  },
  {
    column: 'Operation ID',
    type: String,
    value: (transaction) => transaction.operationId,
  },
  {
    column: 'Player Type',
    type: String,
    value: (transaction) => transaction.playerName,
  },
  {
    column: 'Transaction Type',
    type: String,
    value: (transaction) => transaction.type,
  },
  {
    column: 'Amount',
    type: String,
    value: (transaction) => transaction.amount,
  },
  {
    column: 'Temporary Status',
    type: String,
    value: (transaction) => transaction.temporaryStatus,
  },
  {
    column: 'Provider Status',
    type: String,
    value: (transaction) => transaction.providerStatus,
  },
  {
    column: 'Operation Status',
    type: String,
    value: (transaction) => transaction.operationStatus,
  },
  {
    column: 'Created At',
    type: Date,
    format: 'mm/dd/yyyy',
    value: (user) => user.createdAt,
  },
];
