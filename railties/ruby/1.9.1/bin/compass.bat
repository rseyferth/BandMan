@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"ruby.exe" "E:/Rails Projects/BandMan/railties/ruby/1.9.1/bin/compass" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"ruby.exe" "%~dpn0" %*
