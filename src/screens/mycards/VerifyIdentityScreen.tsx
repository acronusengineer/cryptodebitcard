import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, Fragment, useState } from "react";
import { StyleSheet,
        SafeAreaView, 
        Text, 
        Image, 
        View, 
        PermissionsAndroid, 
        Platform } from "react-native";
import GetStyle from "../../styles";
import c_style from "../../styles/card";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { Button } from "../../components/card/Button";
import useAPIs from "../../services/hooks/useAPIs";
import { useRecoilState } from "recoil";
import { profileState } from "../../states/authState";
import Toast from "react-native-toast-message";
import { LoadingView } from "../../components/loading-view";
import { UpdateUserProfile } from "../../services";
import { ChooseModal } from "../../components/card/ChooseModal";
import { BackButton } from "../../components/card/BackButton";


const VerifyIdentityScreen: FC<
  NativeStackScreenProps<ParamListBase, "VerifyIdentityScreen">
> = ({ navigation, ...props }) => {
  const params = props.route.params;
  const type = (params as any)["item"] as string;
  
  const [photo, setPhoto] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [profile, setProfile] = useRecoilState(profileState);

  const style = GetStyle();

  const { UploadAddressProofImage, UploadIDProofImages } = useAPIs();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive: 'Confirm',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
            buttonPositive: 'Confirm',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
      return false;
    } else return true;
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressContinue = () => {
    const formData = new FormData();
        
    if (type === "ID") {
      if (!photo || !photo1) return;
      setLoading(true);
      formData.append("user_id", profile?.codegoId!);
      formData.append("document_id", "1");
      formData.append("document_number", Date.now().toString());
      formData.append("front_proof", {
        uri: photo,
        type: "images/jpg",
        name: "id_front.jpg",
      } as any);
      formData.append("back_proof", {
        uri: photo1,
        type: "images/jpg",
        name: "id_back.jpg",
      } as any);

      UploadIDProofImages(formData).then((resp) => {
        Toast.show({
          type: "custom",
          props: {
            style: resp.status === 1 ? "success" : "error",
          },
          text1: resp.message,
          text2: "Please wait and retry to upload your proof.",
        });
        if (resp.status === 1 && profile?.uid) {
          UpdateUserProfile(profile?.uid, {
            idDocStatus: "Pending",
          }).then((pro) => {
            setProfile(pro);
          });
        }
        setLoading(false);
        navigation.goBack();
      }).catch((error) => {
        Toast.show({
          type: "custom",
          props: {
            style: "error",
          },
          text1: error.message,
          text2: "Please wait and retry to upload your proof.",
        });
        setLoading(false);
      });
    } else {
      if (!photo) return;
      setLoading(true);
      formData.append("user_id", profile?.codegoId!);
      formData.append("document_id", "2");
      formData.append("address_proof", {
        uri: photo,
        type: "images/jpg",
        name: "address.jpg",
      } as any);
      UploadAddressProofImage(formData).then((res) => {
        Toast.show({
          type: "custom",
          props: {
            style: res.status === 1 ? "success" : "error",
          },
          text1: res.message,
          text2: "Please wait and retry to upload your proof.",
        });
        if (res.status === 1 && profile?.uid) {
          UpdateUserProfile(profile?.uid, {
            addressDocStatus: "Pending",
          }).then((pro) => {
            setProfile(pro);
          });
        }
        setLoading(false);
        navigation.goBack();
      }).catch((error) => {
        Toast.show({
          type: "custom",
          props: {
            style: "error",
          },
          text1: error.message,
          text2: "Please wait and retry to upload your proof.",
        });
        setLoading(false);
      });
    }
  };

  const takePhoto = async(index: number) => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(
        {
          maxHeight: 1000,
          maxWidth: 1200,
          saveToPhotos: true,
          mediaType: "photo",
        },
        (result) => {
          if (
            result &&
            result.assets &&
            result.assets.length > 0 &&
            result.assets[0].uri
          ) {
            if (index === 0) {
              setPhoto(result.assets[0].uri);
            } else {
              setPhoto1(result.assets[0].uri);
            }
          }
        }
      ).finally(()=> {
        setShowModal(false);
      });
    }
  };

  const chooseImage = async(index: number) => {
    
    launchImageLibrary(
      {
        includeBase64: false,
        mediaType: "photo",
        maxWidth: 1200,
        maxHeight: 1000,
        quality: 1,
      },
       (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        if (
          response &&
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          if (index === 0) {
            setPhoto(response.assets[0].uri);
          } else {
            setPhoto1(response.assets[0].uri);
          }
        }
    }).finally(()=> {
      setShowModal(false);
    });
  }

  const enabled =
    (type === "ID" && photo && photo1) || (type !== "ID" && photo) && !loading;
  return (
    <SafeAreaView style={[style.WBContainer, style.AndroidSafeArea]}>
      <View style={[c_style.Cheader]}>
        <BackButton onPress={onPressBack} />
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 70,
        }}
      >
        <Text style={[c_style.AgH1, style.FBColor]}>
          Verify your {type === "ID" ? "identity" : "address"}
        </Text>
        <Text style={[c_style.AgP, { color: "#9E9E9E" }]}>
          Make sure that image is clear to read
        </Text>

        {photo != "" && (
          <Image
            source={{ uri: photo }}
            style={{
              width: "100%",
              aspectRatio: 427 / 204,
              borderRadius: 24,
              marginTop: 20,
            }}
          />
        )}
        {photo1 != "" && (
          <Image
            source={{ uri: photo1 }}
            style={{
              width: "100%",
              aspectRatio: 427 / 204,
              borderRadius: 24,
              marginTop: 20,
            }}
          />
        )}
        <View style={{ flex: 1 }} />
        {type === "ID" ? (
          <Fragment>
            <Button
              containerStyle={{ marginBottom: 10 }}
              btn="secondary"
              title="Take a ID front"
              onPress={() => {
                setIsFront(true);
                setShowModal(true);
              }}
            />
            <Button
              btn="secondary"
              title="Take a ID back"
              onPress={() => {
                setIsFront(false);
                setShowModal(true);
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            {photo == "" && (
              <View style={styles.TextContainer}>
                <Text style={styles.TextSecondary}>
                    Registered Bank Account Statement: 
                </Text>
                <Text style={styles.TextSecondary}>
                    - Household Utility Bill (Water, Gas, Electricity, Cable/TV, Home Phone and/or Internet). Mobile Cellphone Statements are not accepted.
                </Text>
                <Text style={styles.TextSecondary}>
                    - Valid Tax Statement
                </Text>
                <Text style={styles.TextSecondary}>
                    - The Proof of Address cannot be older than the past three (3) months, displaying clearly the date.
                </Text>
                <Text style={styles.TextSecondary}>
                    - The Proof of Address must be in account holder name only.
                </Text>
                <Text style={styles.TextSecondary}>
                    - The Proof of Address must display a residential address only.
                </Text>
                <Text style={styles.TextSecondary}>
                    - Image Format
                </Text>
              </View>)}
            <Button
              btn="primary"
              title="Take a new photo"
              onPress={() => {
                setIsFront(true);
                setShowModal(true);
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </Fragment>          
        )}
        <Button
          enabled={enabled ? true : false}
          btn="primary"
          title="Continue"
          onPress={onPressContinue}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
      {showModal && <ChooseModal 
        title="Type of Choose Image"
        data={[
          {
            title: "Take a Photo",
            value: 0,
          },
          {
            title: "Choose from Library",
            value: 1,
          },
        ]}
        isShow = {showModal}   
        onSelect={(value) => { 
          if (value == 0) {
            if (isFront){
              takePhoto(0);
            } else {
              takePhoto(1);
            }
          }else if( value == 1) {
            if (isFront){
              chooseImage(0);
            } else {
              chooseImage(1);
            }
          }    
        }}
        setShowModal={setShowModal}
      />}
      {loading && <LoadingView />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({  
  TextContainer: {
      width: '100%',
      borderRadius: 27,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#FFF5EF',
      padding:20
  },
  TextSecondary: {
    color: '#F7873C',
    marginTop:15
  },
});

export default VerifyIdentityScreen;
