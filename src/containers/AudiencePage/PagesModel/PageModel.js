/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React from 'react';
import { BI_PAGES_FIELD_KEY, BI_SUMMARY_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';

class PageModel {
  data = [];
  globalViewModel = null;
  constructor(entity, globalViewModel) {
    if (entity) {
      this.data = entity ?? [];
      this.globalViewModel = globalViewModel;
    }
  }

  toRaw = () => {
    return this.data;
  };

  toPagesTableTop = () => {
    const headerTable = ['txt_page', 'txt_page_views', 'txt_time_on_page'];
    const accessor = [
      BI_PAGES_FIELD_KEY.URL,
      BI_SUMMARY_FIELD_KEY.NUMBER_OF_UNIQUE_PAGE_VIEWS,
      BI_SUMMARY_FIELD_KEY.AVERAGE_SESSION_DURATION,
    ];
    if (this.data?.length) {
      const header = accessor.map((key, index) => {
        return {
          Header: headerTable[index],
          accessor: key,
          Cell: ({ cell, column }) => {
            const urlParams = column.id === BI_PAGES_FIELD_KEY.URL && new URL(cell?.value);
            return column.id === BI_PAGES_FIELD_KEY.URL ? (
              <div className={'px-15'}>
                {urlParams === '' ? 'Unknown' : urlParams.pathname + urlParams.search}
              </div>
            ) : column.id === BI_SUMMARY_FIELD_KEY.AVERAGE_SESSION_DURATION ? (
              <div className={'px-15 text-end'}>
                {cell?.value ? moment.utc(cell?.value * 1000).format('HH:mm:ss') : '00:00:00'}
              </div>
            ) : (
              <div className={'px-15 text-end'}>{cell?.value ?? null}</div>
            );
          },
        };
      });
      const data = this.data
        ?.map((item) => {
          return {
            ...item,
            ...accessor
              .map((i) => {
                return {
                  [i]: item[i],
                };
              })
              .reduce((accumulator, currentValue) => ({ ...currentValue, ...accumulator }), {}),
          };
        })
        ?.sort(
          (a, b) =>
            b[BI_SUMMARY_FIELD_KEY.NUMBER_OF_UNIQUE_PAGE_VIEWS] -
            a[BI_SUMMARY_FIELD_KEY.NUMBER_OF_UNIQUE_PAGE_VIEWS]
        );

      return {
        header,
        data: data,
      };
    } else {
      return {
        header: [],
        data: [],
      };
    }
  };
}

export default PageModel;
