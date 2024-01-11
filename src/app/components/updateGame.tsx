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
  GameEntryEntryWithId,
} from '../../../models/GameEntry/GameEntry';

const gameEntryInputs: Record<
  GameEntryProperty,
  {
    label?: string;
    type:
      | 'text'
      | 'url'
      | 'date'
      | 'select'
      | 'password'
      | 'checkbox'
      | 'number';
    option?: typeof validPlatforms;
  }
> = {
  title: {
    type: 'text',
  },
  estimatedBeatTime: {
    label: 'Estimated Runtime',
    type: 'number',
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

type GameUpdateFormProps = {
  onComplete: () => void;
  onCancel: () => void;
  game: GameEntryEntryWithId;
};

export default function UpdateGame(props: GameUpdateFormProps) {
  const [formError, setFormError] = useState('');
  const [autoFillResult, setAutoFillResult] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GameEntryRequest>({
    resolver: zodResolver(GameEntryRequest),
    defaultValues: {
      title: props.game.title,
      bought: props.game.bought,
      beaten: props.game.beaten,
      platform: props.game.platform,
      estimatedBeatTime: props.game.estimatedBeatTime,
      boughtDate: props.game.boughtDate
        ? formatDate(new Date(props.game.boughtDate), 'yyyy-MM-dd')
        : nowString,
      mainImage: props.game.mainImage,
      apiKey:
        typeof window !== 'undefined'
          ? localStorage.getItem('apiKey') ?? ''
          : '',
    },
  });
  const onSubmit: SubmitHandler<GameEntryRequest> = async (data) => {
    try {
      setFormError('');

      const updatingGame = props.game as unknown as GameEntryRequest;

      const body = {
        oldGame: updatingGame,
        newGame: data,
      };
      const response = await fetch('/api/games', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        localStorage.setItem('apiKey', data.apiKey);
        router.push('/');
        reset();
        props.onComplete();
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
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-end">
          <button
            onClick={() => {
              props.onCancel();
              reset();
            }}
            className="btn btn-secondary"
          >
            CANCEL
          </button>
        </div>
        <h2 className="card-title">Update</h2>
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
                <div className="flex flex-row">
                  {value.type === 'select' ? (
                    <select
                      className={`textarea textarea-bordered w-full ${
                        errors[property] ? 'input-error' : ''
                      }`}
                      {...register(property)}
                    >
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
                      {...register(property, {
                        valueAsNumber: value.type === 'number',
                      })}
                      onKeyDown={(e) => {
                        e.preventDefault();
                        setAutoFillResult('');
                      }}
                    />
                  )}
                  {value.label === 'Estimated Runtime' && (
                    <>
                      <button
                        className="btn btn-primary size-sm"
                        onClick={async (e) => {
                          e.preventDefault();
                          const response = await fetch(
                            encodeURI(
                              `/api/timeto?name=${encodeURI(props.game.title)}`
                            )
                          )
                            .then((res) => res.json())
                            .then((json) => {
                              return json;
                            });
                          setValue('estimatedBeatTime', response.gameplayMain);
                          setAutoFillResult(
                            `${response.name} - ${response.platforms[0]}`
                          );
                        }}
                      >
                        test autofill
                      </button>
                      {autoFillResult && (
                        <div className="tooltip" data-tip={autoFillResult}>
                          <div className="badge badge-accent">found</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {errors[property] && <span>{errors[property]?.message}</span>}
              </div>
            );
          })}
          <div className="card-actions justify-end">
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
