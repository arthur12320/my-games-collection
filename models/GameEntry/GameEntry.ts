/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';
import isValidDate from 'date-fns/isValid';

const errors = {
  title: 'Title cannot be empty.',
  url: 'Image must be a valid URL.',
  platform: 'Platform cannot be empty',
  boughtDateString: 'Bought Date must be a valid date.',
  boughtDateTimestamp: 'Bought Date must be a valid timestamp.',
  bought: 'You have to inform if the game has being bought',
  apiKey: 'API Key cannot be empty.',
  beaten: 'You have to inform if the game has being beaten',
};

export const validConditions = ['CIB', 'gameonly'];

export const validPlatforms = [
  'xbox360',
  'xboxone',
  'xboxseriesx',
  'nintendods',
  'nintendo3ds',
  'nintendoswitch',
  'nintendogameboy',
  'nintendogameboycolor',
  'nintendogameboyadvanced',
  'playstation1',
  'playstation2',
  'playstation3',
  'playstation4',
  'playstation5',
] as const;

const baseValidation = z.object({
  title: z.string().trim().min(1, errors.title),
  platform: z.enum(validPlatforms),
  mainImage: z.string().url(errors.url),
  estimatedBeatTime: z.number(),
  bought: z.boolean({
    required_error: errors.bought,
    invalid_type_error: errors.bought,
  }),
  beaten: z.boolean({
    required_error: errors.beaten,
    invalid_type_error: errors.beaten,
  }),
});

export const GameEntryRequest = baseValidation.extend({
  boughtDate: z
    .string()
    .refine((date) => isValidDate(new Date(date)), {
      message: errors.boughtDateString,
    })
    .optional(),
  apiKey: z.string().min(1, errors.apiKey),
});

export const GameEntryEntry = baseValidation.extend({
  boughtDate: z
    .number()

    .or(z.string())
    .transform((date, ctx) => {
      if (typeof date === 'string') {
        const validDate = isValidDate(new Date(date));
        if (!validDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date string.',
          });
          return z.NEVER;
        }
        return new Date(date).getTime();
      }
      return date;
    })
    .refine(isValidDate, {
      message: errors.boughtDateTimestamp,
    })
    .optional(),
});

export const GameEntryEntryWithId = GameEntryEntry.extend({
  _id: z.string(),
});

export const GameEntryProperties = GameEntryRequest.keyof().Enum;
export type GameEntryProperty = keyof typeof GameEntryProperties;
export const GameEntryPlataforms = GameEntryProperties;

export type GameEntryRequest = z.infer<typeof GameEntryRequest>;
export type GameEntryEntry = z.infer<typeof GameEntryEntry>;
export type GameEntryEntryWithId = z.infer<typeof GameEntryEntryWithId>;

export const sortProperties = [
  'title',
  'platform',
  'boughtDate',
  'estimatedBeatTime',
];
