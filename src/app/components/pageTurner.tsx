import React, { Dispatch, SetStateAction } from 'react';

type PageTurnerProps = {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  count: number;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
};

function PageTurner(props: PageTurnerProps) {
  const { setPage, page, limit, setLimit, count } = props;
  return (
    <>
      <div className="lg:w-4/12 m-4 bg-slate-600 rounded drop-shadow-lg p-2">
        <div className="flex flex-row justify-between content-center">
          <button
            disabled={page <= 0}
            className=" btn btn-primary btn-md md:btn-md lg:btn-lg disabled:bg-white"
            onClick={() => {
              setPage((prevPage) => {
                return prevPage - 1;
              });
            }}
          >
            Prev
          </button>
          <h1 className="my-auto text-xl text-white">{`${
            page + 1
          } / ${Math.ceil(count / limit)}`}</h1>
          <button
            disabled={page >= Math.floor(count / limit)}
            className=" btn btn-primary btn-md md:btn-md lg:btn-lg disabled:bg-white"
            onClick={() => {
              setPage((prevPage) => {
                return prevPage + 1;
              });
            }}
          >
            Next
          </button>
        </div>
        <div className="mt-4 ">
          <select
            onChange={(e) => {
              setLimit(parseInt(e.target.value, 10));
              setPage(0);
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option selected={limit === 10} value={10}>
              10
            </option>
            <option selected={limit === 20} value={20}>
              20
            </option>
            <option selected={limit === 30} value={30}>
              30
            </option>
            <option selected={limit === 40} value={40}>
              40
            </option>
            <option selected={limit === -1} value={-1}>
              max
            </option>
          </select>
        </div>
      </div>
    </>
  );
}

export default PageTurner;
