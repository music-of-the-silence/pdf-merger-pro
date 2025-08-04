class PDFMerger {
  constructor() {
    this.files = [];
    this.initializeElements();
    this.bindEvents();
    this.initializeNavigation();
  }

  initializeElements() {
    this.uploadArea = document.getElementById("uploadArea");
    this.fileInput = document.getElementById("fileInput");
    this.fileList = document.getElementById("fileList");
    this.mergeBtn = document.getElementById("mergeBtn");
    this.clearBtn = document.getElementById("clearBtn");
    this.progress = document.getElementById("progress");
    this.progressBar = document.getElementById("progressBar");
    this.statusMessage = document.getElementById("statusMessage");
  }

  initializeNavigation() {
    // Mobile navigation toggle
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });

      // Close mobile menu when clicking on a link
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          navToggle.classList.remove("active");
          navMenu.classList.remove("active");
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navToggle.classList.remove("active");
          navMenu.classList.remove("active");
        }
      });
    }

    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  bindEvents() {
    this.uploadArea.addEventListener("click", () => this.fileInput.click());
    this.fileInput.addEventListener("change", (e) => this.handleFileSelect(e));
    this.mergeBtn.addEventListener("click", () => this.mergePDFs());
    this.clearBtn.addEventListener("click", () => this.clearFiles());

    this.uploadArea.addEventListener("dragover", (e) => this.handleDragOver(e));
    this.uploadArea.addEventListener("dragleave", (e) =>
      this.handleDragLeave(e)
    );
    this.uploadArea.addEventListener("drop", (e) => this.handleDrop(e));
  }

  handleDragOver(e) {
    e.preventDefault();
    this.uploadArea.classList.add("dragover");
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.uploadArea.classList.remove("dragover");
  }

  handleDrop(e) {
    e.preventDefault();
    this.uploadArea.classList.remove("dragover");
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    this.addFiles(files);
  }

  handleFileSelect(e) {
    const files = Array.from(e.target.files);
    this.addFiles(files);
  }

  async addFiles(newFiles) {
    for (const file of newFiles) {
      if (
        file.type === "application/pdf" &&
        !this.files.find((f) => f.file.name === file.name)
      ) {
        try {
          const fileBytes = await file.arrayBuffer();
          const pdfDoc = await PDFLib.PDFDocument.load(fileBytes);
          const pageCount = pdfDoc.getPageCount();

          // Initialize with all pages selected
          const selectedPages = [];
          for (let i = 1; i <= pageCount; i++) {
            selectedPages.push(i);
          }

          this.files.push({
            file: file,
            fileBytes: fileBytes,
            pageCount: pageCount,
            selectedPages: selectedPages,
            textInput: `1-${pageCount}`,
          });
        } catch (error) {
          this.showStatus(
            `Error loading ${file.name}: ${error.message}`,
            "error"
          );
        }
      }
    }
    this.updateFileList();
    this.updateButtons();
  }

  removeFile(index) {
    this.files.splice(index, 1);
    this.updateFileList();
    this.updateButtons();
  }

  moveFile(index, direction) {
    if (direction === "up" && index > 0) {
      [this.files[index], this.files[index - 1]] = [
        this.files[index - 1],
        this.files[index],
      ];
    } else if (direction === "down" && index < this.files.length - 1) {
      [this.files[index], this.files[index + 1]] = [
        this.files[index + 1],
        this.files[index],
      ];
    }
    this.updateFileList();
  }

  togglePageSelection(fileIndex, pageNumber) {
    event.stopPropagation();
    const fileData = this.files[fileIndex];
    const pageIndex = fileData.selectedPages.indexOf(pageNumber);

    if (pageIndex > -1) {
      fileData.selectedPages.splice(pageIndex, 1);
    } else {
      fileData.selectedPages.push(pageNumber);
    }

    fileData.selectedPages.sort((a, b) => a - b);
    this.updateTextInputFromCheckboxes(fileIndex);

    // Force immediate update of the display
    setTimeout(() => {
      this.updateSelectedPagesDisplay(fileIndex);
      this.updateCheckboxStates(fileIndex);
      this.updateButtons();
    }, 0);
  }

  updateCheckboxStates(fileIndex) {
    const fileData = this.files[fileIndex];
    const checkboxes = document.querySelectorAll(
      `[data-file-index="${fileIndex}"] .page-checkbox`
    );
    const checkboxItems = document.querySelectorAll(
      `[data-file-index="${fileIndex}"] .page-checkbox-item`
    );

    checkboxes.forEach((checkbox, index) => {
      const pageNumber = index + 1;
      const isSelected = fileData.selectedPages.includes(pageNumber);
      checkbox.checked = isSelected;

      if (checkboxItems[index]) {
        if (isSelected) {
          checkboxItems[index].classList.add("selected");
        } else {
          checkboxItems[index].classList.remove("selected");
        }
      }
    });
  }

  selectAllPages(fileIndex) {
    const fileData = this.files[fileIndex];
    fileData.selectedPages = [];
    for (let i = 1; i <= fileData.pageCount; i++) {
      fileData.selectedPages.push(i);
    }
    fileData.textInput = `1-${fileData.pageCount}`;
    this.updateSelectedPagesDisplay(fileIndex);
    this.updateCheckboxStates(fileIndex);
    this.updateTextInput(fileIndex);
    this.updateButtons();
  }

  deselectAllPages(fileIndex) {
    const fileData = this.files[fileIndex];
    fileData.selectedPages = [];
    fileData.textInput = "";
    this.updateSelectedPagesDisplay(fileIndex);
    this.updateCheckboxStates(fileIndex);
    this.updateTextInput(fileIndex);
    this.updateButtons();
  }

  updateTextInput(fileIndex) {
    const textInput = document.getElementById(`pageInput-${fileIndex}`);
    if (textInput) {
      textInput.value = this.files[fileIndex].textInput;
    }
  }

  updateTextInputFromCheckboxes(fileIndex) {
    const fileData = this.files[fileIndex];
    const pages = fileData.selectedPages;

    if (pages.length === 0) {
      fileData.textInput = "";
      return;
    }

    // Convert array to range notation
    let ranges = [];
    let start = pages[0];
    let end = pages[0];

    for (let i = 1; i < pages.length; i++) {
      if (pages[i] === end + 1) {
        end = pages[i];
      } else {
        if (start === end) {
          ranges.push(start.toString());
        } else {
          ranges.push(`${start}-${end}`);
        }
        start = pages[i];
        end = pages[i];
      }
    }

    if (start === end) {
      ranges.push(start.toString());
    } else {
      ranges.push(`${start}-${end}`);
    }

    fileData.textInput = ranges.join(", ");
  }

  updateCheckboxesFromTextInput(fileIndex, textInput) {
    const fileData = this.files[fileIndex];
    fileData.textInput = textInput;
    fileData.selectedPages = this.parsePageSelection(
      textInput,
      fileData.pageCount
    );
    this.updateSelectedPagesDisplay(fileIndex);
    this.updateCheckboxStates(fileIndex);
    this.updateButtons();
  }

  updatePageSelection(index, pageSelection) {
    this.updateCheckboxesFromTextInput(index, pageSelection);
  }

  parsePageSelection(pageSelection, maxPages) {
    const pages = new Set();
    const parts = pageSelection.split(",");

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start, end] = trimmed
          .split("-")
          .map((num) => parseInt(num.trim()));
        if (start && end && start <= end && start >= 1 && end <= maxPages) {
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      } else {
        const pageNum = parseInt(trimmed);
        if (pageNum >= 1 && pageNum <= maxPages) {
          pages.add(pageNum);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  }

  updateSelectedPagesDisplay(index) {
    const fileData = this.files[index];
    const selectedPagesArray = fileData.selectedPages || [];
    const displayElement = document.getElementById(`selectedPages-${index}`);

    if (displayElement) {
      if (selectedPagesArray.length > 0) {
        const sortedPages = [...selectedPagesArray].sort((a, b) => a - b);
        displayElement.innerHTML = `<strong>Selected pages:</strong> ${sortedPages.join(
          ", "
        )} (${sortedPages.length} pages)`;
      } else {
        displayElement.innerHTML = `<strong>No pages selected</strong>`;
      }
    }
  }

  updateFileList() {
    if (this.files.length === 0) {
      this.fileList.innerHTML =
        '<div class="empty-state">No PDF files selected yet</div>';
      return;
    }

    this.fileList.innerHTML = this.files
      .map(
        (fileData, index) => `
                    <div class="file-item">
                        <div class="file-header">
                            <div class="file-info">
                                <div class="file-icon">PDF</div>
                                <div class="file-details">
                                    <h4>${fileData.file.name}</h4>
                                    <p>${this.formatFileSize(
                                      fileData.file.size
                                    )} • ${
          fileData.pageCount
        } pages • Position ${index + 1}</p>
                                </div>
                            </div>
                            <div class="file-actions">
                                <button class="btn btn-secondary btn-small" onclick="merger.moveFile(${index}, 'up')" ${
          index === 0 ? "disabled" : ""
        }>
                                    ↑
                                </button>
                                <button class="btn btn-secondary btn-small" onclick="merger.moveFile(${index}, 'down')" ${
          index === this.files.length - 1 ? "disabled" : ""
        }>
                                    ↓
                                </button>
                                <button class="btn btn-danger btn-small" onclick="merger.removeFile(${index})">
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div class="page-selection">
                            <div class="page-selection-header">
                                <h5>Page Selection</h5>
                                <span class="page-count">Total: ${
                                  fileData.pageCount
                                } pages</span>
                            </div>
                            
                            <div class="selection-controls">
                                <button class="btn btn-secondary btn-small" onclick="merger.selectAllPages(${index})">
                                    ✓ Select All
                                </button>
                                <button class="btn btn-secondary btn-small" onclick="merger.deselectAllPages(${index})">
                                    ✗ Deselect All
                                </button>
                            </div>
                            
                            <div class="page-grid" data-file-index="${index}">
                                ${Array.from(
                                  { length: fileData.pageCount },
                                  (_, i) => i + 1
                                )
                                  .map(
                                    (pageNum) => `
                                    <div class="page-checkbox-item ${
                                      fileData.selectedPages.includes(pageNum)
                                        ? "selected"
                                        : ""
                                    }" 
                                         onclick="merger.togglePageSelection(${index}, ${pageNum}); event.stopPropagation();">
                                        <input type="checkbox" 
                                               class="page-checkbox" 
                                               ${
                                                 fileData.selectedPages.includes(
                                                   pageNum
                                                 )
                                                   ? "checked"
                                                   : ""
                                               }
                                               onclick="event.stopPropagation(); merger.togglePageSelection(${index}, ${pageNum});">
                                        <span>Page ${pageNum}</span>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                            
                            <div class="text-input-section">
                                <div class="page-input-section">
                                    <label for="pageInput-${index}">Or specify pages manually:</label>
                                    <input 
                                        type="text" 
                                        id="pageInput-${index}" 
                                        class="page-input"
                                        value="${fileData.textInput}"
                                        placeholder="e.g., 1-3, 5, 7-9"
                                        onchange="merger.updatePageSelection(${index}, this.value)"
                                        oninput="merger.updatePageSelection(${index}, this.value)"
                                    >
                                    <div class="page-examples">
                                        Examples: "1-5" (pages 1 to 5), "1,3,5" (specific pages), "1-3,7-9" (ranges)
                                    </div>
                                </div>
                            </div>
                            
                            <div class="selected-pages" id="selectedPages-${index}"></div>
                        </div>
                    </div>
                `
      )
      .join("");

    // Initialize selected pages display
    this.files.forEach((_, index) => {
      this.updateSelectedPagesDisplay(index);
    });
  }

  updateButtons() {
    const hasFiles = this.files.length > 0;
    const hasValidSelections = this.files.some((fileData) => {
      return fileData.selectedPages.length > 0;
    });

    this.clearBtn.disabled = !hasFiles;
    this.mergeBtn.disabled = !hasValidSelections;
  }

  clearFiles() {
    this.files = [];
    this.fileInput.value = "";
    this.updateFileList();
    this.updateButtons();
    this.hideStatus();
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  showProgress() {
    this.progress.style.display = "block";
    this.progressBar.style.width = "0%";
  }

  updateProgress(percent) {
    this.progressBar.style.width = percent + "%";
  }

  hideProgress() {
    this.progress.style.display = "none";
  }

  showStatus(message, type = "success") {
    this.statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
  }

  hideStatus() {
    this.statusMessage.innerHTML = "";
  }

  async mergePDFs() {
    try {
      this.mergeBtn.disabled = true;
      this.showProgress();
      this.hideStatus();

      const mergedPdf = await PDFLib.PDFDocument.create();
      let totalPagesAdded = 0;

      for (let i = 0; i < this.files.length; i++) {
        const fileData = this.files[i];
        const selectedPages = fileData.selectedPages;

        if (selectedPages.length === 0) continue;

        this.updateProgress((i / this.files.length) * 80);

        // Load PDF document fresh for each merge operation
        const sourcePdf = await PDFLib.PDFDocument.load(fileData.fileBytes);

        // Copy selected pages (PDF-lib uses 0-based indexing)
        const pageIndices = selectedPages.map((pageNum) => pageNum - 1);

        try {
          const pages = await mergedPdf.copyPages(sourcePdf, pageIndices);

          pages.forEach((page) => {
            mergedPdf.addPage(page);
            totalPagesAdded++;
          });
        } catch (pageError) {
          console.error(
            `Error copying pages from ${fileData.file.name}:`,
            pageError
          );
          throw new Error(
            `Failed to copy pages from ${fileData.file.name}: ${pageError.message}`
          );
        }
      }

      if (totalPagesAdded === 0) {
        throw new Error("No valid pages selected for merging");
      }

      this.updateProgress(90);

      // Generate the merged PDF
      const mergedPdfBytes = await mergedPdf.save();

      this.updateProgress(100);

      // Create and trigger download
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `merged-pages-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      this.showStatus(
        `Successfully merged ${totalPagesAdded} pages from ${this.files.length} PDF files!`,
        "success"
      );
    } catch (error) {
      console.error("Error merging PDFs:", error);
      this.showStatus(
        `Error during merge operation: ${error.message}`,
        "error"
      );
    } finally {
      this.hideProgress();
      this.mergeBtn.disabled = false;
      this.updateButtons();
    }
  }
}

// Initialize the PDF merger when the DOM is fully loaded
let merger;
document.addEventListener('DOMContentLoaded', () => {
  merger = new PDFMerger();
  // Make merger globally accessible for onclick handlers
  window.merger = merger;
});

// Export the PDFMerger class for potential use in other modules
export { PDFMerger };
