import SearchComponent from './SearchComponent';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
// import ActionComponent from './ActionComponent';
import ComponentSVG from 'components/ComponentSVG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { AesirXSelect } from 'aesirx-uikit';
import { env } from 'aesirx-lib';
import { AesirXDatePicker } from 'aesirx-uikit';

const ComponentFilter = ({ isSearch, isAction, isDate, isContinent, ...props }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const { t } = props;
  return (
    <div className="bg-white shadow-sm d-flex mb-24">
      {isSearch && <SearchComponent />}
      {isAction && (
        <div className="border-end-1">
          <AesirXSelect
            defaultValue={[{ label: 'Select an action', value: 'all' }]}
            options={[{ label: 'Select an action', value: 'all' }]}
            className={`fs-14 fw-semibold h-100 py-sm`}
            isBorder={false}
            arrowColor={'#1ab394'}
            placeholder={t('choose_an_action')}
          />
        </div>
      )}
      {isDate && (
        <div ref={datePickerRef} className="d-flex align-items-center px-24 border-end-1">
          <ComponentSVG url={env.PUBLIC_URL + '/assets/images/calendar.svg'} />
          <AesirXDatePicker
            isOpen={openDatePicker}
            setIsOpen={setOpenDatePicker}
            datePickerRef={datePickerRef}
            placeholder={t('txt_date_range')}
            isDays
          />
          <FontAwesomeIcon className="text-success" icon={faChevronDown} />
        </div>
      )}
      {isContinent && (
        <div className="border-end-1">
          <AesirXSelect
            options={[{ label: 'Select an action', value: 'all' }]}
            className={`fs-14 fw-semibold h-100 py-sm`}
            isBorder={false}
            arrowColor={'#1ab394'}
            placeholder={t('txt_continent')}
          />
        </div>
      )}
      {isContinent && (
        <div className="border-end-1">
          <AesirXSelect
            options={[{ label: 'Select an action', value: 'all' }]}
            className={`fs-14 fw-semibold h-100 py-sm`}
            isBorder={false}
            arrowColor={'#1ab394'}
            placeholder={t('txt_region')}
          />
        </div>
      )}
      {isContinent && (
        <div className="border-end-1">
          <AesirXSelect
            options={[{ label: 'Select an action', value: 'all' }]}
            className={`fs-14 fw-semibold h-100 py-sm`}
            isBorder={false}
            arrowColor={'#1ab394'}
            placeholder={t('txt_channels')}
          />
        </div>
      )}
      {isContinent && (
        <div className="border-end-1">
          <AesirXSelect
            options={[{ label: 'Select an action', value: 'all' }]}
            className={`fs-14 fw-semibold h-100 py-sm`}
            isBorder={false}
            arrowColor={'#1ab394'}
            placeholder={t('txt_devices')}
          />
        </div>
      )}
    </div>
  );
};

export default withTranslation()(ComponentFilter);
