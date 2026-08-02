@echo off
echo ========================================================
echo  Compiling Wealthy Minds Java Backend (Java 8+)...
echo ========================================================

if not exist bin mkdir bin

javac -d bin -sourcepath src src/com/wealthyminds/WealthyMindsServer.java

if %ERRORLEVEL% EQU 0 (
    echo Compilation successful! Starting Java REST API Server...
    java -cp bin com.wealthyminds.WealthyMindsServer
) else (
    echo Compilation failed. Please check Java errors.
    pause
)
