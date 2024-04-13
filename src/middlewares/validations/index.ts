import { validationResult } from 'express-validator';

export * from './user';
export * from './post';

export const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(403).json({ errors: errors.array() });
    };
};
