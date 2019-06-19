var theEntry;
var theEntries;
var theFileSystem;
var br = '<br />';
var hr = '<hr />';
var startP = '<p>';
var endP = '</p>';
var options = new FileUploadOptions();
options.mimeType = "text/plain";

function getMyTxtfile() {
      window.resolveLocalFileSystemURL("file:///storage/emulated/0/Download/testbla.txt", gotFile, onFileError);
}

function processDir(fileSystemType) {
      alert("processDir: " + fileSystemType);
      //Get a handle to the local file system (allocate 1 Mb for
      // storage)
      window.requestFileSystem(fileSystemType, 1024 * 1024, onGetFileSystemSuccess, onFileError);
}

function gotFile(fileEntry) {
      alert(fileEntry);
      fileEntry.file(onFileReaderSuccess, onFileError);
}

function transFile() {
  var ft = new FileTransfer();
  var fileURI = "file:///storage/emulated/0/Download/testbla.txt";
  var serverURL = encodeURI("http://www.ausl.bologna.it/");
  ft.upload(fileURI, serverURL, onUploadSuccess, onFileTransferError, options);
}

function onUploadSuccess(ur) {
  $('#readInfo').append("Upload Response Code: " + ur.responseCode);
}

function onFileTransferError(e) {
  var msgText;
  switch(e.code) {
    case FileTransferError.FILE_NOT_FOUND_ERR:
      msgText = "File not found.";
      break;
    case FileTransferError.INVALID_URL_ERR:
      msgText = "Invalid URL.";
      break;
    case FileTransferError.CONNECTION_ERR:
      msgText = "Connection error.";
      break;
    default:
      msgText = "Unknown error.";
  }
  //Now tell the user what happened
  alert(msgText, null, "File Transfer Error");
}

function onFileReaderSuccess(file) {
  var reader = new FileReader();

  reader.onloadend = function(e) {
    $('#readInfo').append("Load end" + br);
    $('#fileContents').text(e.target.result);
  };

  reader.onloadstart = function(e) {
    $('#readInfo').append("Load start" + br);
  };

  reader.onloaderror = function(e) {
    $('#readInfo').append("Load error: " + e.target.error.code + br);
  };

  reader.readAsText(file);
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
    //Display the directory entries page
  $.mobile.changePage("#fileDetails", "slide", false, true);
}

function viewFile() {
  $('#viewFileName').html('<h1>' + theEntry.name + '</h1>');
  //Display the directory entries page
  $.mobile.changePage("#viewFile", "slide", false, true);
  if(theEntry.isDirectory == true) {
    alert("is a dir");
    theEntry.readEntries(onDirReaderSuccess, onFileError);
  } else {
    theEntry.file(onFileReaderSuccess, onFileError);
  }
}

function onFileReaderSuccess(file) {
  var reader = new FileReader();

  reader.onloadend = function(e) {
    $('#readInfo').append("Load end" + br);
    $('#fileContents').text(e.target.result);
  };

  reader.onloadstart = function(e) {
    $('#readInfo').append("Load start" + br);
  };

  reader.onloaderror = function(e) {
    $('#readInfo').append("Load error: " + e.target.error.code + br);
  };

  reader.readAsText(file);
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
