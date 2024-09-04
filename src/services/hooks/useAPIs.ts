import useAxios from "./useAxios";
import appConfig from "../../configs";
import {
    AccountDetail,
    CodegoCustomer,
    CodegoResponse,
    Country,
    CreateCustomerResp,
    DebitCard,
    CardActivateResp,
    CodegoCardDetail,
    DebitTransactionResp,
    KYCDocStatus,
    KYCDocument,
    Nationality,
    PrepaidTransactionResp,
    PrepaidLoadCardResp,
    GetCryptoCoinResp,
    CryptoWalletAddressResp,
    CryptoWalletListResp,
  } from "../../models/codego";
  

const useAPIs = () => {

    const {axiosPost} = useAxios();
    
    const RefreshToken = async () => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/refreshtoken`,
        { 
          apikey: appConfig.codego_api_key,
          whitelabel_id: appConfig.codego_white_key
        });
      return res.data;
    };
      
    const GetCountries = async (): Promise<Country[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/countries_list`,
        {
          apikey: appConfig.codego_api_key,
          whitelabel_id: appConfig.codego_white_key
        }
      );
      return res.data.countries as Country[];
    };
    
    const GetNationalities = async (): Promise<Nationality[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/nationality`,
        {
          apikey: appConfig.codego_api_key,
          whitelabel_id: appConfig.codego_white_key
        }
      );
      return res.data.countries as Nationality[];
    };
    
    const GetIncomeSources = async (): Promise<string[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/income_source`,
        {
          apikey: appConfig.codego_api_key,
          whitelabel_id: appConfig.codego_white_key
        }
      );
      return res.data.income_source as string[];
    };
    
    const CreateCustomer = async (
      customer: CodegoCustomer
    ): Promise<CreateCustomerResp> => { 
      const res = await axiosPost(`${appConfig.codego_base_url}/api/signup`,
        {
            apikey: appConfig.codego_api_key,
            whitelabel_id: appConfig.codego_white_key,
            ...customer,
        },
        {
            "Content-Type": "application/javascript",
        }
      );
      return res.data as CreateCustomerResp;
    };
    
    const GetKYCDocList = async (): Promise<KYCDocument[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/documents_list`,
        {
          apikey: appConfig.codego_api_key,
          whitelabel_id: appConfig.codego_white_key
        }
      );
      return res.data.documents as KYCDocument[];
    };
    
    const UploadIDProofImages = async (
      formdata: FormData
    ): Promise<CodegoResponse> => {        
      formdata.append("apikey", appConfig.codego_api_key);
      formdata.append("whitelabel_id", appConfig.codego_white_key);
      console.log("formdata:", formdata);
      const res = await axiosPost(`${appConfig.codego_base_url}/api/upload_id_proof`, formdata,
        {
          "Content-Type": "multipart/form-data",
      });
      return res.data as CodegoResponse;
    };
    
    const UploadAddressProofImage = async (
      formdata: FormData
    ): Promise<CodegoResponse> => {
      formdata.append("apikey", appConfig.codego_api_key);
      formdata.append("whitelabel_id", appConfig.codego_white_key);
      const res = await axiosPost(`${appConfig.codego_base_url}/api/address_proof`, formdata,
        {
          "Content-Type": "multipart/form-data",
      });
      return res.data as CodegoResponse;
    };
    
    const CheckRemainingCards = async (
      user_id: string,
      type: "prepaid" | "debitcard"
    ): Promise<number> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/check_remaining_card`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        type,
      });
      return Number(res.data.remaining_card) as number;
    };
    
    const ShippingCostForCards = async (
      user_id: string,
      type: "prepaid" | "debitcard"
    ): Promise<number> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/get_shipping_cost`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        type,
      });
      return Number(res.data.shipping_cost) as number;
    };
    
    const CheckKYCStatus = async (
      user_id: string
    ): Promise<KYCDocStatus[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/check_kyc_status`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
      });
      return res.data.kyc_status as KYCDocStatus[];
    };
    
    const DebitOrderCard = async (
      user_id: string,
      card_type: "plastic" | "metal"
    ): Promise<CodegoResponse> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/debitcard_card_order`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        type: "order",
        card_type,
      });
      return res.data as CodegoResponse;
    };
    
    const DebitActivateCard = async (
      user_id: string,
      card: DebitCard
    ): Promise<CardActivateResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/debitcard_activate`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        ...card,
      });
      return res.data as CardActivateResp;
    };
    
    const DebitCardDetails = async (
      user_id: string
    ): Promise<CodegoCardDetail[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/debitcard_details`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
      });
      if (!res.data.card_details) {
        return [];
      }
      if (Array.isArray(res.data.card_details))
        return res.data.card_details as CodegoCardDetail[];
      else return [res.data.card_details] as CodegoCardDetail[];
    };
    
    const DebitUpdateSetting = async (
      user_id: string,
      card_id: string,
      setting_name: string,
      setting_value: string
    ): Promise<CodegoResponse> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/debitcard_settings`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        card_id,
        setting_name,
        setting_value,
      });
      return res.data as CodegoResponse;
    };
    
    const GetDebitTransactions = async (
      user_id: string,
      page: string,
      type: string
    ): Promise<DebitTransactionResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/debitcard_trx`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        page,
        type,
      });
      return res.data as DebitTransactionResp;
    };
    
    const AccountDetails = async (
      user_id: string
    ): Promise<AccountDetail> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/account_detail`, 
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
      });
      return res.data.account as AccountDetail;
    };
    
    const RequestStolenOrReplace = async (
      user_id: string,
      card_id: string
    ): Promise<CodegoResponse> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/replace_stolen_card`,
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        card_id,
      });
      return res.data as CodegoResponse;
    };
    
    const PrepaidOrderCard = async (
      user_id: string
    ): Promise<CodegoResponse> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/prepaid_card_order`,
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        type: "order",
      });
      return res.data as CodegoResponse;
    };
    
    const PrepaidActivateCard = async (
      user_id: string,
      card: DebitCard
    ): Promise<CardActivateResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/prepaid_card_activate`,
      {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        ...card,
      });
      return res.data as CardActivateResp;
    };
    
    const PrepaidCardDetails = async (
      user_id: string
    ): Promise<CodegoCardDetail[]> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/prepaid_card_details`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
      });
      if (!res.data.card_details) {
        return [];
      }
      if (Array.isArray(res.data.card_details))
        return res.data.card_details as CodegoCardDetail[];
      else return [res.data.card_details] as CodegoCardDetail[];
    };
    
    const PrepaidUpdateSetting = async (
      user_id: string,
      card_id: string,
      setting_name: string,
      setting_value: string
    ): Promise<CodegoResponse> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/prepaid_card_settings`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        card_id,
        setting_name,
        setting_value,
      });
      return res.data as CodegoResponse;
    };
    
    const GetPrepaidTransactions = async (
      user_id: string,
      month: string,
      year: string
    ): Promise<PrepaidTransactionResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/prepaid_card_transaction`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        month,
        year,
      });
      return res.data as PrepaidTransactionResp;
    };
    
    const PrepaidLoadCard = async (
      user_id: string,
      card_id: string,
      amount: string
    ): Promise<PrepaidLoadCardResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/prepaid_load_balance_card`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        card_id,
        amount,
      });
      return res.data as PrepaidLoadCardResp;
    };
    
    const PrepaidResetCardPin = async (
      user_id: string,
      card_id: string
    ): Promise<CodegoResponse> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/reset_card_pin`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        card_id,
      });
      return res.data as CodegoResponse;
    };
    
    const GetCoinList = async (
      user_id: string
    ): Promise<GetCryptoCoinResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/crypto_getCoinList`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
      });
      return res.data as GetCryptoCoinResp;
    };

    const GenerateWalletAddress = async (
      user_id: string, coin: string, network: string
    ): Promise<CryptoWalletAddressResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/crypto_generateWaletAddress`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
        coin,
        network,
      });
      return res.data as CryptoWalletAddressResp;
    };

    const GetWalletAddresss = async (
      user_id: string
    ): Promise<CryptoWalletListResp> => {
      const res = await axiosPost(`${appConfig.codego_base_url}/api/crypto_getWalletAddresss`, {
        apikey: appConfig.codego_api_key,
        whitelabel_id: appConfig.codego_white_key,
        user_id,
      });
      return res.data as CryptoWalletListResp;
    };


    return {      
        RefreshToken,
        GetCountries,
        GetNationalities,
        GetIncomeSources,
        CreateCustomer,
        GetKYCDocList,
        UploadIDProofImages,
        UploadAddressProofImage,
        CheckRemainingCards,
        ShippingCostForCards,
        CheckKYCStatus,
        DebitOrderCard,
        DebitActivateCard,
        DebitCardDetails,
        DebitUpdateSetting,
        GetDebitTransactions,
        AccountDetails,
        RequestStolenOrReplace,
        PrepaidOrderCard,
        PrepaidActivateCard,
        PrepaidCardDetails,
        PrepaidUpdateSetting,
        GetPrepaidTransactions,
        PrepaidLoadCard,
        PrepaidResetCardPin,
        GetCoinList,
        GenerateWalletAddress,
        GetWalletAddresss,
    }
}

export default useAPIs;