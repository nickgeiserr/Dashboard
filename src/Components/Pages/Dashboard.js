import React, { useEffect, useState } from 'react';
import DashboardSection from '../DashboardSection';
import { fetchUserDocument, b_CanUserAccessPage, getFirestoreInstance } from '../../Services/FirebaseService.js';

function Dashboard({ firebaseApp, config }) {
  const [membershipItems, setMembershipItems] = useState([]);
  const [chapterItems, setChapterItems] = useState([]);
  const [acyuItems, setAcyuItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebaseApp.auth().currentUser;
      
      if (user) {
        const uid = user.uid; // Get the user UID
        const userData = await fetchUserDocument(uid);
        if (userData) {
          const newMembershipItems = [];
          const newChapterItems = [];
          const newAcyuItems = [];
  
          for (const itemId in config.items) {
            const item = config.items[itemId];
            const canAccess = await b_CanUserAccessPage(uid, item); // Pass UID here
  
            if (canAccess) {
              // console.log("user can access");
              // console.log(item.title)
              const newItem = {
                id: itemId,
                title: item.title,
                description: item.description,
                route: item.path,
              };
  
              if (item.section === 'membership') {
                newMembershipItems.push(newItem);
              } else if (item.section === 'chapter') {
                newChapterItems.push(newItem);
              } else if (item.section === 'acyu') {
                newAcyuItems.push(newItem);
              }
            }
            // console.log("user cant access");
          }
  
          setMembershipItems(newMembershipItems);
          setChapterItems(newChapterItems);
          setAcyuItems(newAcyuItems);
        } else {
          // console.log('User document not found');
        }
      }
    };

    fetchUserData();
  }, [firebaseApp, config.items]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <DashboardSection locked={true} title="Chapter" items={chapterItems} colorTint="#171717" />
      <DashboardSection locked={false} title="ACYU / Membership" items={membershipItems} colorTint="#171717" />
    </div>
    
  );
  
}

export default Dashboard;
