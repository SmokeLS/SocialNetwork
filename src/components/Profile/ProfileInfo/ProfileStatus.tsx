import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
  status: string;
  setUserStatus: (status: string) => void;
}

const ProfileStatus : React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const changeStatus = () => {
    setEditMode(true);
  };

  const changingStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  const setUserStatus = () => {
    setEditMode(false);
    props.setUserStatus(status);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <>
      {!editMode ? (
        <div>
          <span onDoubleClick={changeStatus}>{props.status || '-------'}</span>
        </div>
      ) : (
        <div>
          <input autoFocus value={status} onChange={changingStatus} onBlur={setUserStatus} />
        </div>
      )}
    </>
  );
};
export default ProfileStatus;
