import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../Context/Dataprovider';
import Shownotification from './Shownotification';

export default function Notification() {
  const [notifydata, setnotifydata] = useState([]);
  const { paccount } = useContext(DataContext);
  const API_URL='';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          userName: paccount.userName,
        };
        const response = await axios.get(`${API_URL}/blogify/notification`, {
          params: params,
        });

        if (response) {
          // Clear the notifydata array before populating it
          setnotifydata([]);
          response.data.data.notificationdata.forEach((el) => {
            setnotifydata((prevData) => [...prevData, ...el]);
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [paccount.userName]); // Ensure the effect runs when userName changes

  return (
    <div>
      {notifydata && notifydata.length > 0 ? (
        notifydata.map((el) => <Shownotification key={el._id} data={el} />)
      ) : (
        <div>Abhi tak koi notification nahi hai</div>
      )}
    </div>
  );
}
