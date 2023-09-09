'use client';

// import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
import formatDate from 'date-fns/format';
import { useState } from 'react';
import {
  GameEntryRequest,
  validPlatforms,
} from '../../../models/GameEntry/GameEntry';
// import { title } from 'process';

// const gameEntryInputs: Record<
//   GameEntryProperty,
//   {
//     label?: string;
//     type: 'text' | 'url' | 'date' | 'select' | 'password' | 'checkbox';
//     option?: typeof validPlatforms;
//   }
// > = {
//   title: {
//     type: 'text',
//   },
//   mainImage: {
//     label: 'image',
//     type: 'url',
//   },
//   platform: {
//     type: 'select',
//     option: validPlatforms as typeof validPlatforms,
//   },
//   boughtDate: {
//     label: 'Day of Purchase',
//     type: 'date',
//   },
//   bought: {
//     label: 'Bought',
//     type: 'checkbox',
//   },
//   apiKey: {
//     label: 'API key',
//     type: 'password',
//   },
//   beaten: {
//     label: 'Beaten',
//     type: 'checkbox',
//   },
// };

const nowString = formatDate(new Date(), 'yyyy-MM-dd');

// type GameEntryFormProps = {
//   onComplete: () => void;
//   onCancel: () => void ;
// };

export default function AddGame() {
  const [formError, setFormError] = useState('');
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [image, setImage] = useState('');
  const [bought, setBought] = useState(false);
  const [boughtDate, setBoughtDate] = useState(nowString);
  const [beaten, setBeaten] = useState(false);
  const [apiKey, setApiKey] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('apiKey') ?? '' : ''
  );
  const router = useRouter();

  const onSubmit = async (data: GameEntryRequest) => {
    try {
      setFormError('');
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        localStorage.setItem('apiKey', data.apiKey);
        router.push('/');
        // reset();
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      // TODO: cleanup zod error message
      setFormError(error.message);
    }
  };
  return (
    <div className="bg-slate-600 h-full">
      <div className="flex justify-end">
        <button
          onClick={() => {
            router.push('/');
            // reset();
          }}
          className="btn btn-secondary"
        >
          CANCEL
        </button>
      </div>
      <div className="mx-auto max-w-md flex gap-4 flex-col my-4">
        {formError && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formError}</span>
            </div>
          </div>
        )}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">title</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              formError ? 'input-error' : ''
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">image Url</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              formError ? 'input-error' : ''
            }`}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">platform</span>
          </label>
          <select
            className={`textarea textarea-bordered w-full ${
              formError ? 'input-error' : ''
            }`}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="" disabled hidden>
              select
            </option>
            {validPlatforms.map((option, i) => (
              <option key={i} value={option as string}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">bought</span>
          </label>
          <input
            type="checkbox"
            className={`input input-bordered w-full ${
              formError ? 'input-error' : ''
            }`}
            checked={bought}
            onChange={(e) => setBought(e.target.checked)}
          />
        </div>
        {bought && (
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text capitalize">bought</span>
            </label>
            <input
              type="date"
              className={`input input-bordered w-full ${
                formError ? 'input-error' : ''
              }`}
              value={boughtDate}
              onChange={(e) => setBoughtDate(e.target.value)}
            />
          </div>
        )}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">beaten</span>
          </label>
          <input
            type="checkbox"
            className={`input input-bordered w-full ${
              formError ? 'input-error' : ''
            }`}
            checked={beaten}
            onChange={(e) => setBeaten(e.target.checked)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">api key</span>
          </label>
          <input
            type="password"
            className={`input input-bordered w-full ${
              formError ? 'input-error' : ''
            }`}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success"
          onClick={() =>
            onSubmit({
              title,
              mainImage: image,
              platform: platform as
                | 'xbox360'
                | 'xboxone'
                | 'xboxseriesx'
                | 'nintendods'
                | 'nintendo3ds'
                | 'nintendoswitch'
                | 'nintendogameboy'
                | 'nintendogameboycolor'
                | 'nintendogameboyadvanced'
                | 'playstation1'
                | 'playstation2'
                | 'playstation3'
                | 'playstation4'
                | 'playstation5',
              bought,
              beaten,
              boughtDate: bought ? boughtDate : undefined,
              apiKey,
            })
          }
        >
          Create
        </button>
      </div>
    </div>
  );
}
