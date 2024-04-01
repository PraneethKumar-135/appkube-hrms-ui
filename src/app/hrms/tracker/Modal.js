'use client';
import React, { useState } from 'react';
import { Button, Modal, Radio } from 'antd';

const Popup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-blue-600 rounded-none mt-7'>
        Manage Invite
      </Button>
      <Modal
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        closable={false}
        maskClosable={true}
        onClick={handleModalClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
        }}
      >
        <div style={{ textAlign: 'left', padding: '20px'}} className='h-96 w-96'>
          
          <div><h2 className='text-2xl font-semibold justify-center text-center'>Manage Invite</h2></div>
          <div><p className='font-semibold mt-4 text-base justify-center text-center'>Select Method</p></div>

          <div className='mt-6'>
            <div className='bg-slate-50 h-14'>
              <Radio value={1} className='font-semibold'> <p>Reschedule Invite</p></Radio>
              <p className='text-xs ml-6 mt-1'>Currently scheduled for 18 feb.</p>
            </div>
            <div className='bg-slate-50 h-14 mt-2'>
              <Radio value={2} className='font-semibold'><p>Send now</p></Radio>
              <p className='text-xs ml-6 mt-1'>Workers will receive an invitation email now.</p>
            </div>
            <div className='bg-slate-50 h-14 mt-2'>
              <Radio value={3} className='font-semibold'><p>Cancel Invite</p></Radio>
              <p className='text-xs ml-6 mt-1'>You can schedule an invite at a later time</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }} className='mt-6'>
            <Button type="primary" onClick={handleContinue} className='w-60'>
            Continue
          </Button></div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;