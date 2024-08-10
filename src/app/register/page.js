'use client';

import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOpenRegIdFromPickedDates, getUsernameByUid, saveRegistration, getNextRegId, uploadFile } from '../../firebase/database';
import { getAuth } from 'firebase/auth';
import { Card, Input, Button, Typography } from "@material-tailwind/react";

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

            <div className="flex w-full items-center justify-center h-screen">
      <Card color="transparent" shadow={false} className="shadow-lg border px-4 py-10 h-fit flex flex-col md:w-1/3">
        <div className="flex flex-col flex-grow">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Registration Page
          </Typography>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col flex-grow gap-2">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Id Registrasi
            </Typography>
            <Input name="open_reg_id" value={openRegId || ''} disabled/>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                UID
            </Typography>
            <Input name="uid" value={uid || ''} disabled   />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
            </Typography>
            <Input name="username" value={username} disabled   />
            <div className="mb-4 flex flex-col gap-6 flex-grow">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Reason
              </Typography>
              <Input
                size="lg"
                placeholder="reason"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Programming Languages
              </Typography>
              <Input
                size="lg"
                placeholder="C++"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                value={programmingLanguages}
                onChange={(e) => setProgrammingLanguages(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="flex flex-col text-gray-900">
                <label className="font-medium">Upload File:</label>
                <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="file:bg-gray-900 file:text-white file:border-none file:rounded file:px-3 file:py-1 shadow border rounded"
                />
            </div>
            </div>
            <Button type="submit" className="mt-auto" fullWidth>
              JOIN
            </Button>
          </form>
        </div>
      </Card>
    </div>
        </div>
    );
}