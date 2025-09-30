#!/bin/bash
cat > "$PGDATA/pg_hba.conf" << 'EOF'
host dictionary dictreader 0.0.0.0/0 trust
host dictionary dictreader ::/0 trust
local all postgres peer
host all postgres 127.0.0.1/32 md5
EOF
