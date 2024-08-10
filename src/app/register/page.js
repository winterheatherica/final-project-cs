'use client';

import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOpenRegIdFromPickedDates, getUsernameByUid, saveRegistration, getNextRegId, uploadFile } from '../../firebase/database';
import { getAuth } from 'firebase/auth';

export default function Register() {
    const router = useRouter();
    const [openRegId, setOpenRegId] = useState(null);
    const [username, setUsername] = useState('');
    const [reason, setReason] = useState('');
    const [programmingLanguages, setProgrammingLanguages] = useState('');
    const [uid, setUid] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchOpenRegId = async () => {
            try {
                const id = await getOpenRegIdFromPickedDates();
                setOpenRegId(id);

                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const currentUid = user.uid;
                    setUid(currentUid);

                    const username = await getUsernameByUid(currentUid);
                    setUsername(username);
                } else {
                    console.error('No user is authenticated');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOpenRegId();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!openRegId || !uid) return;
      
        try {
          const reg_id = await getNextRegId();
          let certif_loc = '';
      
          if (file) {
            // Pastikan openRegId dan reg_id disertakan saat memanggil uploadFile
            certif_loc = await uploadFile(file, openRegId, reg_id);
          }
      
          await saveRegistration({
            open_reg_id: openRegId,
            uid,
            reg_id,
            reason,
            programmingLanguages,
            certif_loc
          });
      
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
        }
      };
      
    return (
        <div className='pt-20 text-black'>
            <h1>Registration Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="open_reg_id" value={openRegId || ''} disabled />
                <input type="text" name="uid" value={uid || ''} disabled   />
                <input type="text" name="username" value={username} disabled   />
                <input
                    type="text"
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Reason"
                    required
                />
                <input
                    type="text"
                    name="programmingLanguages"
                    value={programmingLanguages}
                    onChange={(e) => setProgrammingLanguages(e.target.value)}
                    placeholder="Programming Languages"
                    required
                />
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
