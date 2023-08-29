import { getFirestoreInstance } from "./FirebaseService";

export const acceptApplication = async (userId) => {
    const userRef = getFirestoreInstance().collection('users').doc(userId);
    userRef.get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                const keysArray = userData.keys || [];

                if (!keysArray.includes('Verified')) {
                    userRef.update({
                        keys: getFirestoreInstance().FieldValue.arrayUnion('Verified')
                    })
                        .then(() => {
                            // console.log('Keys array updated successfully.');

                            const applicationRef = getFirestoreInstance().collection('applications').doc(userId);
                            applicationRef.delete()
                                .then(() => {
                                    // console.log('Application deleted successfully.');
                                })
                                .catch(error => {
                                    console.error('Error deleting application:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error updating keys array:', error);
                        });
                } else {
                    // console.log('User already has the "Verified" key.');
                }
            } else {
                // console.log('User not found.');
            }
        })
        .catch(error => {
            console.error('Error checking user data:', error);
        });
}