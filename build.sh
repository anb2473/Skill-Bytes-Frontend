#!/bin/bash
cd ~/Skill-Bytes-Frontend
npm run build
rm ~/Skill-Bytes-Backend/server/public/dist
mv dist ~/Skill-Bytes-Backend/server/public/dist
