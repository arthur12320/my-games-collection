'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import formatDate from 'date-fns/format';
import { useState } from 'react';
import {
  GameEntryProperty,
  GameEntryRequest,
  validPlatforms,
} from '../../../models/GameEntry/GameEntry';

const gameEntryInputs: Record<
  GameEntryProperty,
  {
    label?: string;
    type: 'text' | 'url' | 'date' | 'select' | 'password' | 'checkbox';
    option?: typeof validPlatforms;
  }
> = {
  title: {
    type: 'text',
  },
  mainImage: {
    label: 'image',
    type: 'url',
  },
  platform: {
    type: 'select',
    option: validPlatforms as typeof validPlatforms,
  },
  boughtDate: {
    label: 'Day of Purchase',
    type: 'date',
  },
  bought: {
    label: 'Bought',
    type: 'checkbox',
  },
  apiKey: {
    label: 'API key',
    type: 'password',
  },
  beaten: {
    label: 'Beaten',
    type: 'checkbox',
  },
};

const nowString = formatDate(new Date(), 'yyyy-MM-dd');

// type GameEntryFormProps = {
//   onComplete: () => void;
//   onCancel: () => void ;
// };

export default function AddGame() {
  const [formError, setFormError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GameEntryRequest>({
    resolver: zodResolver(GameEntryRequest),
    defaultValues: {
      title: '',
      bought: true,
      beaten: false,
      boughtDate: nowString,
      mainImage: '',
      apiKey:
        typeof window !== 'undefined'
          ? localStorage.getItem('apiKey') ?? ''
          : '',
    },
  });
  const onSubmit: SubmitHandler<GameEntryRequest> = async (data) => {
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
        reset();
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
            reset();
          }}
          className="btn btn-secondary"
        >
          CANCEL
        </button>
      </div>
      <form
        className="mx-auto max-w-md flex gap-4 flex-col my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        {Object.entries(gameEntryInputs).map(([name, value]) => {
          const property = name as GameEntryProperty;
          return (
            <div key={name} className="form-control w-full">
              <label className="label">
                <span className="label-text capitalize">
                  {value.label || name}
                </span>
              </label>
              {value.type === 'select' ? (
                <select
                  className={`textarea textarea-bordered w-full ${
                    errors[property] ? 'input-error' : ''
                  }`}
                  {...register(property)}
                >
                  <option value="" selected disabled hidden>
                    select
                  </option>
                  {value.option?.map((option, i) => (
                    <option key={i} value={option as string}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={value.type}
                  step="any"
                  className={`input input-bordered w-full ${
                    errors[property] ? 'input-error' : ''
                  }`}
                  {...register(property)}
                />
              )}
              {errors[property] && <span>{errors[property]?.message}</span>}
            </div>
          );
        })}
        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
}
