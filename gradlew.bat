@rem
@rem  Gradle startup script for Windows
@rem

@if "%DEBUG%" == "" @echo off
@if "%JAVA_HOME%" == "" goto errorNoJavaHome

set DEFAULT_JVM_OPTS="-Xmx64m" "-Xms64m"

@rem Find main.bat
set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve Gradle Wrapper jar
set WRAPPER_JAR="%APP_HOME%gradle\wrapper\gradle-wrapper.jar"

"%JAVA_HOME%\bin\java.exe" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath %WRAPPER_JAR% org.gradle.wrapper.GradleWrapperMain %*

:errorNoJavaHome
echo ERROR: JAVA_HOME is not set.
