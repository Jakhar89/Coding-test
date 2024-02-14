import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  customerMarketingPreference: Yup.string().required(),
  customerCorrespondencePreference: Yup.string().required(),
});

export default validationSchema;
