CREATE or REPLACE FUNCTION checkAvailableMeanings()
RETURNS TRIGGER
AS $$
    DECLARE
        new_or_old user_occurrences%ROWTYPE;
    BEGIN
        IF tg_op = 'UPDATE' THEN
            new_or_old := OLD;
        ELSE
            new_or_old := NEW;
        END IF;
        IF EXISTS (SELECT FROM words WHERE words.word = new_or_old.word) THEN
            new_or_old.available_meanings := TRUE;
        ELSE
            new_or_old.available_meanings := FALSE;
        END IF;
        RETURN new_or_old;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER beforeInsertUserOccurrence BEFORE INSERT
    ON user_occurrences
    FOR EACH ROW
    EXECUTE PROCEDURE checkAvailableMeanings();

CREATE TRIGGER beforeUpdateUserOccurrence BEFORE UPDATE
    ON user_occurrences
    FOR EACH ROW
    EXECUTE PROCEDURE checkAvailableMeanings();