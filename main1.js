    var theEntries;
    var theEntry;
    var theFileSystem;
    function onBodyLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    
    function onDeviceReady() {
        navigator.notification.alert("PhoneGap is ready!");
    }
    function processDir(fileSystemType) {
      alert("processDir: " + fileSystemType);
      //Get a handle to the local file system (allocate 1 Mb for
      // storage)
      window.requestFileSystem(fileSystemType, 1024 * 1024, onGetFileSystemSuccess, onFileError);
    }
function onGetFileSystemSuccess(fs) {
  alert("onGetFileSystemSuccess: " + fs.name + " storage (" + fs.root.fullPath + ")");
  //Save the file system object so we can access it later
  //Yes, I know it's cheating, but it's an easier way to do this
  theFileSystem = fs;
  //Create a directory reader we'll use to list the files in the
  // directory
  var dr = fs.root.createReader();
  // Get a list of all the entries in the directory
  dr.readEntries(onDirReaderSuccess, onFileError);
}
function onDirReaderSuccess(dirEntries) {
  alert("onDirReaderSuccess (" + dirEntries.length + ")");  
  theEntries = dirEntries;  
  len = theEntries.length;
  if(len > 0) {
    fl = '<ul data-role="listview" id="dirEntryList">';
    for( i = 0; i < len; i++) {
      if(theEntries[i].isDirectory == true) {
        fl += '<li><a href="" onclick="processEntry(' + i + ');">Directory: ' + theEntries[i].fullPath + '</a></li>';
      } else {
        fl += '<li><a href="" onclick="processEntry(' + i + ');">File: ' + theEntries[i].name + '</a></li>';
      }
    }
    fl += "</ul>";
    $('#info').html(fl);
  }
}
    
function processEntry1(entry) {
    alert(entry.name, entry.fullPath);
}
    
function processEntry(entryIndex) {
  //clear out the writeInfo div in case we go back to the list
  // page
  $('#info').empty();
  //Get access to the inidividual file entry
  #theEntry = theEntries[entryIndex];
  //FileInfo variable
  var fi = "";
  fi += '<p>' + '<b>Name</b>: ' + "theEntry.name" + '</p>';
  fi += '<p>' + '<b>Full Path</b>: ' + "theEntry.fullPath" + '</p>';
  fi += '<p>' + '<b>URI</b>: ' + "theEntry.toURI()" + '</p>';
  if(theEntry.isFile == true) {
    fi += '<p>' + 'The entry is a file' + '</p>';
  } else {
    fi += '<p>' + 'The entry is a directory' + '</p>';
  }
  alert("entry i" + entryIndex);
    #alert(theEntries);
  //Update the page content with information about the file
  $('#fileInfo').html(fi);
}    
   
function onFileError(e) {
  var msgText;
  switch(e.code) {
    case FileError.NOT_FOUND_ERR:
      msgText = "File not found error.";
      break;
    case FileError.SECURITY_ERR:
      msgText = "Security error.";
      break;
    case FileError.ABORT_ERR:
      msgText = "Abort error.";
      break;
    case FileError.NOT_READABLE_ERR:
      msgText = "Not readable error.";
      break;
    case FileError.ENCODING_ERR:
      msgText = "Encoding error.";
      break;
    case FileError.NO_MODIFICATION_ALLOWED_ERR:
      msgText = "No modification allowed.";
      break;
    case FileError.INVALID_STATE_ERR:
      msgText = "Invalid state.";
      break;
    case FileError.SYNTAX_ERR:
      msgText = "Syntax error.";
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msgText = "Invalid modification.";
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      msgText = "Quote exceeded.";
      break;
    case FileError.TYPE_MISMATCH_ERR:
      msgText = "Type mismatch.";
      break;
    case FileError.PATH_EXISTS_ERR:
      msgText = "Path exists error.";
      break;
    default:
      msgText = "Unknown error.";
  }
  //Now tell the user what happened
  navigator.notification.alert(msgText, null, "File Error");
}

