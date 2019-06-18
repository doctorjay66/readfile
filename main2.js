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
