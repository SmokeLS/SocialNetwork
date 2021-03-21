import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../../types/types';
import { useSelector } from 'react-redux';
import { getFilteredUsers } from './../../../redux/users-selectors';

type PropsType = {
  onChangeFilter: (filter: FilterType) => void;
};

const SearchForm: React.FC<PropsType> = (props) => {
  const filter = useSelector(getFilteredUsers);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ term: filter.term, friend: filter.friend }}
      onSubmit={(values, { setSubmitting }) => {
        props.onChangeFilter(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
          <Field as="select" name="friend">
            <option value="null">null</option>
            <option value="true">followed</option>
            <option value="false">unfollowed</option>
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
