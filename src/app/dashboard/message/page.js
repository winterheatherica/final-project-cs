'use client';

import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import RequireAuth from '../../../firebase/requireAuth';

const MessageDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const db = getDatabase();
        const messagesRef = ref(db, 'messages');
        const snapshot = await get(messagesRef);

        if (snapshot.exists()) {
          const messagesData = snapshot.val();
          const sortedMessages = Object.entries(messagesData).sort(
            (a, b) => new Date(b[1].sent_at) - new Date(a[1].sent_at)
          );
          setMessages(sortedMessages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        setError('Error fetching messages: ' + err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <RequireAuth allowedTypes={['A']}>
      <div className='pt-20'>
        <h1>Message Dashboard</h1>
        <p>Manage messages here.</p>
        {error && <p className="text-red-500">{error}</p>}
        <table className='table-auto w-full mt-4 border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2'>Message ID</th>
              <th className='border border-gray-300 px-4 py-2'>UID</th>
              <th className='border border-gray-300 px-4 py-2'>Title</th>
              <th className='border border-gray-300 px-4 py-2'>Content</th>
              <th className='border border-gray-300 px-4 py-2'>Sent At</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(([messageId, message]) => (
              <tr key={messageId}>
                <td className='border border-gray-300 px-4 py-2'>{messageId}</td>
                <td className='border border-gray-300 px-4 py-2'>{message.uid}</td>
                <td className='border border-gray-300 px-4 py-2'>{message.title}</td>
                <td className='border border-gray-300 px-4 py-2'>{message.content}</td>
                <td className='border border-gray-300 px-4 py-2'>{message.sent_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RequireAuth>
  );
};

export default MessageDashboard;
