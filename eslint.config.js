import js from '@eslint/js'
import ts from 'typescript-eslint'
export default ts.config({ignores:['src/routeTree.gen.ts','dist/**']},js.configs.recommended,...ts.configs.recommended,{files:['src/**/*.{ts,tsx}'],rules:{'@typescript-eslint/no-unused-vars':['error',{argsIgnorePattern:'^_'}]}})
