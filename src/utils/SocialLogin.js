export const onGoogleButtonPress = async () => {
    try {
        const { idToken } = await GoogleSignin.signIn();

        Alert.alert('Google Sign-In Successful', 'ID Token: ' + idToken);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        Alert.alert('Google Sign-In Error', 'Failed to log in with Google.');
    }
};