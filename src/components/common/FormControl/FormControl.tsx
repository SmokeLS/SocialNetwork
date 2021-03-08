import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styles from './FormControl.module.css';

export const Textarea: React.FC<FieldRenderProps<string>> = ({ input , meta }) => {
  return (
    <div>
      <textarea {...input} className={meta.error && meta.touched ? styles.error : ''} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: React.FC<FieldRenderProps<string>> = ({ input, meta }) => {
  return (
    <div>
      <input {...input} className={meta.error && meta.touched ? styles.error : ''} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

// export const Textarea = (props) => {
//   return WithErrorElementCreator('textarea')(props);
// };

// export const Input = (props) => {
//   return WithErrorElementCreator('input')(props);
// };

// const WithErrorElementCreator = (tag) => ({ input, meta }) => {
//   const Elem = React.createElement(tag, {
//     ...input,
//     ...meta,
//     className: meta.error && meta.touched ? styles.error : '',
//   });
//   return (
//     <div>
//       {Elem}
//       {meta.error && meta.touched && <span>{meta.error}</span>}
//     </div>
//   );
// };
