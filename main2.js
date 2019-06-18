var theEntry;
var theEntries;
var theFileSystem;
var br = '<br />';
var hr = '<hr />';
var startP = '<p>';
var endP = '</p>';

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
        fl += '<li><a href="#" onclick="processEntry(' + i + ');">Directory: ' + theEntries[i].name + '</a></li>';
      } else {
        fl += '<li><a href="#" onclick="processEntry(' + i + ');">File: ' + theEntries[i].name + '</a></li>';
      }
    }
    fl += "</ul>";
    $('#dirEntries').html(fl);
    //$('#dirEntryList').listview('refresh');
    $('#dirEntryList').trigger('create');
  } else {
    fl = "<p>No entries found</p>";
    $('#dirEntries').html(fl);
  }
  //Delete any previous fileWriter details we may have on the page
  $('#writeInfo').empty();
  //Display the directory entries page
  $.mobile.changePage("#dirList", "slide", false, true);
}

function processEntry(entryIndex) {
  //clear out the writeInfo div in case we go back to the list
  // page
  $('#info').empty();
  //Get access to the inidividual file entry
  theEntry = theEntries[entryIndex];
  alert(theEntry);
  var fi = "";
  fi += startP + '<b>Name</b>: ' + theEntry.name + endP;
  fi += startP + '<b>Full Path</b>: ' + theEntry.fullPath + endP;
  fi += startP + '<b>URI</b>: ' + theEntry.toURI() + endP;
  if(theEntry.isFile == true) {
    fi += startP + 'The entry is a file' + endP;
  } else {
    fi += startP + 'The entry is a directory' + endP;
  }
  alert(fi);
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
  //navigator.notification.alert(msgText, null, "File Error");
  alert(msgText, null, "File Error");
}
