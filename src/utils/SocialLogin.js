export const onGoogleButtonPress = async () => {
    try {
        // Get the user's ID token
        const { idToken } = await GoogleSignin.signIn();
        // You can use the idToken for your backend verification

        // For demonstration purposes, we'll just alert the user
        Alert.alert('Google Sign-In Successful', 'ID Token: ' + idToken);
        // Here you might want to send the token to your backend server for verification
        // and to create or log in the user
        // For now, we will simulate user navigation
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        Alert.alert('Google Sign-In Error', 'Failed to log in with Google.');
    }
};