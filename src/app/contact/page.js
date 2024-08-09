// ./contact/page.js
'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';

export default function Contact() {
  const [uid, setUid] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid);
    } else {
      console.error('No user is authenticated');
    }
  }, []);

  const getNextMessageId = async () => {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages_count');
    const snapshot = await get(messagesRef);

    let nextMessageId = 1;

    if (snapshot.exists()) {
      nextMessageId = snapshot.val() + 1;
    }

    // Update the message_count to the next value
    await set(messagesRef, nextMessageId);

    return nextMessageId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content) return;
  
    try {
      const messageId = await getNextMessageId();
      const db = getDatabase();
      const messageRef = ref(db, `messages/${messageId}`);
  
      const newMessage = {
        uid,
        id: messageId,
        title,
        content,
        sent_at: new Date().toLocaleString(),
      };
  
      await set(messageRef, newMessage);
  
      // Kirim request POST ke API route sendEmail
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
  
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send the message via email.');
      }
  
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mx-auto pt-20">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">UID:</label>
          <input
            type="text"
            value={uid}
            readOnly
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
            className="border p-2 w-full h-32"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
