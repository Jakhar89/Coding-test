export const enquiries = {
  GENERAL_ENQUIRY: 'general enquiry',
  HARDSHIP: 'hardship',
  NEW_RE_FINANCE: 'new finance / change my finance',
  INSURANCE: 'insurance',
  ROADSIDE_ASSISTANCE: 'roadside assistance',
  COMPLAINTS: 'complaints',
};

export const getComplaintsCategory = (category: string): string => {
  if (!category) return '';
  switch (category?.toLowerCase()?.trim()) {
    case 'advice':
      return 'IC01';
    case 'fees, interest or charges':
      return 'IC02';
    case 'consumer data right':
      return 'IC03';
    case 'credit reporting':
      return 'IC04';
    case 'disclosure':
      return 'IC05';
    case 'collections':
      return 'IC06';
    case 'financial difficulty and hardship':
      return 'IC06';
    case 'credit assessment':
      return 'IC07';
    case 'insurance':
      return 'IC08';
    case 'n/a':
      return 'IC09';
    case 'delay/failure to follow instructions':
      return 'IC10';
    case 'privacy and confidentiality':
      return 'IC11';
    case 'fraud and scams':
      return 'IC12';
    case 'service quality':
      return 'IC13';
    case 'account set up and maintenance':
      return 'IC13';
    case 'transaction and payment disputes':
      return 'IC14';
    default:
      return '';
  }
};
