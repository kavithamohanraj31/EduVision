# Local Database Setup Guide

This guide explains how to set up and use the local SQLite database instead of third-party database services.

## What Changed

- **Removed**: Neon Database (third-party PostgreSQL service)
- **Added**: SQLite (local file-based database)
- **Benefits**: No external dependencies, faster development, easier deployment

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Database

```bash
# This will create the database, run migrations, and seed with sample data
npm run db:init
```

### 3. Start the Application

```bash
npm run dev
```

## Database Files

- **Database File**: `local.db` (created in project root)
- **Migrations**: `./migrations/` folder
- **Schema**: `shared/schema.ts`

## Available Scripts

```bash
# Initialize database with sample data
npm run db:init

# Generate and push schema changes
npm run db:push

# Seed specific data
npm run seed:questions  # Assessment questions only
npm run seed:csv        # CSV data only
npm run seed:all        # All data

# Development
npm run dev             # Start development server
npm run build           # Build for production
npm run start           # Start production server
```

## Database Schema Changes

The schema has been updated for SQLite compatibility:

### Key Changes:
- `varchar` → `text`
- `jsonb` → `text` (stored as JSON strings)
- `timestamp` → `integer` (Unix timestamps)
- `boolean` → `integer` with mode: 'boolean'
- `decimal` → `real`
- `pgTable` → `sqliteTable`

### JSON Fields:
- Arrays and objects are stored as JSON strings
- Automatic conversion in storage layer
- No changes needed in application code

## Data Types

| PostgreSQL | SQLite | Notes |
|------------|--------|-------|
| `varchar` | `text` | No length limit needed |
| `jsonb` | `text` | JSON string with parsing |
| `timestamp` | `integer` | Unix timestamp |
| `boolean` | `integer` | 0/1 with boolean mode |
| `decimal` | `real` | Floating point number |
| `array` | `text` | JSON string array |

## Migration from Neon

If you were using Neon Database before:

1. **Data Export**: Export your data from Neon (if needed)
2. **Run Setup**: `npm run db:init`
3. **Import Data**: Manually import any custom data
4. **Update Environment**: Remove `DATABASE_URL` from environment variables

## Troubleshooting

### Database File Issues
```bash
# Delete and recreate database
rm local.db
npm run db:init
```

### Migration Issues
```bash
# Reset migrations
rm -rf migrations/
npm run db:push
npm run db:init
```

### Permission Issues
```bash
# Fix file permissions
chmod 644 local.db
chmod 755 migrations/
```

## Development Workflow

1. **Schema Changes**: Edit `shared/schema.ts`
2. **Generate Migration**: `npm run db:push`
3. **Test Changes**: `npm run dev`
4. **Reset if Needed**: `rm local.db && npm run db:init`

## Production Deployment

### Local Production
```bash
npm run build
npm run start
```

### Cloud Deployment
- Include `local.db` in your deployment
- Ensure write permissions for database file
- Consider using a persistent volume for database file

## Performance Notes

- **SQLite**: Fast for read-heavy workloads
- **Concurrent Writes**: Limited (fine for most applications)
- **File Size**: Grows with data (monitor disk space)
- **Backup**: Simply copy `local.db` file

## Backup and Restore

### Backup
```bash
cp local.db backup-$(date +%Y%m%d).db
```

### Restore
```bash
cp backup-20240101.db local.db
```

## Monitoring

### Database Size
```bash
ls -lh local.db
```

### Database Info
```bash
sqlite3 local.db ".schema"
sqlite3 local.db ".tables"
```

## Security Considerations

- **File Permissions**: Restrict access to database file
- **Backup Security**: Encrypt backup files
- **Network Access**: SQLite is file-based (no network access)

## Next Steps

1. **Test the Application**: Verify all features work
2. **Customize Data**: Add your own colleges/courses
3. **Monitor Performance**: Check database size and speed
4. **Plan Backups**: Set up regular backup schedule

The local SQLite database provides a simple, reliable solution without external dependencies!
