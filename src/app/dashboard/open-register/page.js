'use client';

import { useEffect, useState } from 'react';
import RequireAuth from '../../../firebase/requireAuth';
import { getAuth } from 'firebase/auth';
import { addOpenReg, getAllOpenRegs, getPickedDate, addPickedDate, getUserById } from '../../../firebase/database';

const OpenRegDashboard = () => {
  const [openReg, setOpenReg] = useState({ user_id: '', open: '', close: '' });
  const [openRegs, setOpenRegs] = useState([]);
  const [pickedOpenReg, setPickedOpenReg] = useState({ open: '', close: '' });
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setOpenReg((prev) => ({ ...prev, user_id: user.uid }));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOpenRegs = async () => {
      try {
        const allOpenRegs = await getAllOpenRegs();
        setOpenRegs(allOpenRegs);
        // Get unique user IDs
        const userIds = [...new Set(allOpenRegs.map(reg => reg.user_id))];
        // Fetch user data
        const userPromises = userIds.map(uid => getUserById(uid));
        const users = await Promise.all(userPromises);
        const userMap = {};
        users.forEach(user => {
          if (user) {
            userMap[user.uid] = user.username;
          }
        });
        setUserMap(userMap);
      } catch (error) {
        console.error('Error fetching open registrations:', error);
      }
    };

    fetchOpenRegs();
  }, []);

  useEffect(() => {
    const fetchPickedDate = async () => {
      try {
        const pickedDate = await getPickedDate();
        setPickedOpenReg(pickedDate);
      } catch (error) {
        console.error('Error fetching picked date:', error);
      }
    };

    fetchPickedDate();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOpenReg((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOpenReg(openReg);
      setOpenReg((prev) => ({ ...prev, open: '', close: '' }));
      const allOpenRegs = await getAllOpenRegs();
      setOpenRegs(allOpenRegs);
    } catch (error) {
      console.error('Error adding open registration:', error);
    }
  };

  const handleRadioButtonChange = async (selectedReg) => {
    try {
      // Gunakan `open_reg_id` dari selectedReg
      const openRegId = selectedReg.open_reg_id;
  
      await addPickedDate({
        open: selectedReg.open,
        close: selectedReg.close,
        open_reg_id: openRegId // Gunakan open_reg_id yang benar
      });
  
      setPickedOpenReg({
        open: selectedReg.open,
        close: selectedReg.close
      });
    } catch (error) {
      console.error('Error updating picked date:', error);
    }
  };
  
  
  
  
  return (
    <RequireAuth allowedTypes={['A']}>
      <div className='pt-10 text-black pl-72 pr-4'>
        <h1 className="text-center text-3xl font-medium">Open Registration</h1>

        <div className="flex justify-between items-end mt-12">

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>User ID: </label>
              <input
                type="text"
                name="user_id"
                value={openReg.user_id || ''} // Ganti jadi Username
                readOnly
                className="border rounded px-2 py-1 bg-gray-100"
              />
            </div>
            <div>
              <label>Open Date: </label>
              <input
                type="date"
                name="open"
                value={openReg.open}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>Close Date: </label>
              <input
                type="date"
                name="close"
                value={openReg.close}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create Open Registration
            </button>
          </form>

          <div className="pr-4 text-center">
            <h2 className="mb-2 font-medium text-lg">Current Open Registration</h2>
            <p className="">{pickedOpenReg.open || 'None'} / {pickedOpenReg.close || 'None'}</p>
          </div>
        </div>

        <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2">Open Reg ID</th>
      <th className="border border-gray-300 px-4 py-2">Username</th>
      <th className="border border-gray-300 px-4 py-2">Open Date</th>
      <th className="border border-gray-300 px-4 py-2">Close Date</th>
      <th className="border border-gray-300 px-4 py-2">Select</th>
    </tr>
  </thead>
  <tbody>
    {openRegs
      .sort((a, b) => new Date(b.close) - new Date(a.close))
      .map((reg) => {
        const isChecked = pickedOpenReg.open === reg.open && pickedOpenReg.close === reg.close;
        return (
          <tr key={reg.id}>
            <td className="border border-gray-300 px-4 py-2">{reg.open_reg_id}</td>
            <td className="border border-gray-300 px-4 py-2">{userMap[reg.user_id] || 'Unknown'}</td>
            <td className="border border-gray-300 px-4 py-2">{reg.open}</td>
            <td className="border border-gray-300 px-4 py-2">{reg.close}</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="radio"
                name="pick"
                value={reg.id}
                checked={isChecked}
                onChange={() => handleRadioButtonChange(reg)}
              />
            </td>
          </tr>
        );
      })}
  </tbody>
</table>


      </div>
    </RequireAuth>
  );
};

export default OpenRegDashboard;
