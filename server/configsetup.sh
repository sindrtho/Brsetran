#!/usr/bin/env bash
echo "export default
{
    mysql: {
        user: \"${DBUSERNAME}\",
        password: \"${DBPASSWORD}\"
    }
}
" > private.config.js;