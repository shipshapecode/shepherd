-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "status" SET DEFAULT 'FREE_TRIAL';

DO
$$
DECLARE
    subscriptionId TEXT;
    userRecord RECORD;
BEGIN
    -- Loop through User records with null Subscription relation
    FOR userRecord IN SELECT * FROM "User" WHERE "subscriptionId" IS NULL LOOP
        -- Generate cuid for the new Subscription record
        subscriptionId := uuid_generate_v4()::TEXT;
        
        -- Insert a new Subscription record with cuid value, current timestamp for updatedAt, and link to the user by userId
        INSERT INTO "Subscription" (id, "status", "type", "updatedAt", "userId") 
        VALUES (subscriptionId, 'IN_TRIAL', 'FREE', NOW(), userRecord.id);

        -- Update User record to link to the newly created Subscription record
        UPDATE "User"
        SET "subscriptionId" = subscriptionId
        WHERE "id" = userRecord.id;
    END LOOP;
END
$$;
