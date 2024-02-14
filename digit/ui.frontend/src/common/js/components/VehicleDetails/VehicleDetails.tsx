import React, { useEffect, useRef, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import { loginFlow, postCallAPI } from '@/utility/helpers/api';
import { apiErrorRedirect } from '@/utility/helpers/error-handling';

import { VehicleDetailsParsedProps } from './definitions';

const VehicleDetails = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const [vehicleDetails, setVehicleDetails] = useState<any>({
    make: '',
    model: '',
    variant: '',
    year: '',
    vin: '',
    engineNum: '',
    vehicleRegNum: '',
    vehicleRegState: '',
  });

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { loginInfo, contractsData, vehicleData } = apiResponse;

  const vehicleDetailsJson: VehicleDetailsParsedProps = JSON.parse(attributes);

  const questApiKey = localStorage?.getItem('apiKey') ?? vehicleDetailsJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? vehicleDetailsJson?.globalConfig?.baseApiUrl;

  const transformedDataFromAPI = (vehicle) => ({
    make: vehicle.vehicleSpecification.vehicleMake ?? '',
    model: vehicle.vehicleSpecification.vehicleModel ?? '',
    variant: vehicle.vehicleSpecification.vehicleModelVariant ?? '',
    year: vehicle.vehicleSpecification.vehicleYear ?? '',
    vin: vehicle.vehicle.vehicleIdentificationNumber ?? '',
    engineNum: vehicle.vehicleEngine.vehicleEngineNumber ?? '',
    vehicleRegNum: vehicle.vehicleRegistration.vehicleRegistrationNumber ?? '',
    vehicleRegState: vehicle.vehicleRegistration.vehicleRegistrationState ?? '',
  });

  useEffect(() => {
    if (baseApiUrl && questApiKey && !loginInfo) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  const setContractID = (contractsData) => {
    return `${contractsData?.customerDomain?.contract?.contractId}`;
  };

  useEffect(() => {
    const postData = {
      customerDomain: {
        contract: {
          contractId: selectedContract ? setContractID(selectedContract) : setContractID(contractsData?.contracts?.[0]),
        },
      },
    };

    contractsData &&
      postCallAPI('vehicle-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
        if (response?.data) {
          /**
           * Need to be revisited in case of multiple vehicles
           */
          const vehicle = response?.data?.assets[0]?.vehicleDomain;
          const data = transformedDataFromAPI(vehicle);
          addToAPIResponse('vehicleData', response.data);
          setVehicleDetails(data);
        } else {
          throw 'Vehicle Data';
        }
      });
  }, [contractsData, selectedContract]);

  const data = [
    {
      title: vehicleDetailsJson.makeLabelText,
      value: vehicleDetails.make,
    },
    {
      title: vehicleDetailsJson.modelLabelText,
      value: vehicleDetails.model,
    },
    {
      title: vehicleDetailsJson.variantLabelText,
      value: vehicleDetails.variant,
    },
    {
      title: vehicleDetailsJson.yearLabelText,
      value: vehicleDetails.year,
    },
    {
      title: vehicleDetailsJson.vinLabelText,
      value: vehicleDetails.vin,
      disclaimer: vehicleDetailsJson.vinCaptionText,
    },
    {
      title: vehicleDetailsJson.engineNumLabelText,
      value: vehicleDetails.engineNum,
    },
    {
      title: vehicleDetailsJson.vehicleRegNumLabelText,
      value: vehicleDetails.vehicleRegNum,
    },
    {
      title: vehicleDetailsJson.vehicleRegStateLabelText,
      value: vehicleDetails.vehicleRegState,
    },
  ];

  if (!data) {
    return null;
  }

  return (
    <FormSection
      spacingSize="macro1"
      sectionWidth="halfwidth"
    >
      <HeadingWithDivider>{vehicleDetailsJson.vehicleDetailsLabelText}</HeadingWithDivider>
      <DataList data={data} />
    </FormSection>
  );
};

export default VehicleDetails;
