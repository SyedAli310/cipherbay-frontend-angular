import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PromptService {
    constructor() { }

    success(message) {
        this.alert('success',message);
    }

    error(message) {
        this.alert('error',message);
    }

    warning(message) {
        this.alert('warning',message);
    }

    info(message) {
        this.alert('info',message);
    }

    private removePrevAlert() {
        const alertPrev = document.querySelector(".alert");
        if (alertPrev) {
            alertPrev.remove();
        }
    }

    private createNewAlert(state, msg) {
        const alert = document.createElement("div");
        alert.classList.add("alert");
        if (state == "success") {
            alert.classList.add("is-success");
        } else if (state == "error") {
            alert.classList.add("is-error");
        } else if (state == "warning") {
            alert.classList.add("is-warning");
        } else {
            alert.classList.add("is-info");
        }
        alert.innerHTML = `
            <button class='alert-close-btn'>
                <span>&times;</span>
            </button>
            <div class='alert-msg'>${msg}</div>
            `;
        document.body.appendChild(alert);
        // close alert
        alert.querySelector(".alert-close-btn").addEventListener("click", () => {
            alert.remove();
        });
        let timeout = setTimeout(() => {
            alert.remove();
        }, 5000);
        // stop alert from disappearing on mouseover
        alert.addEventListener("mouseover", () => {
            // pause alert
            clearTimeout(timeout);
        });
        alert.addEventListener("mouseout", () => {
            // resume alert
            timeout = setTimeout(() => {
            alert.remove();
            }, 2000);
        });      
    }

    private alert(state, msg) {
        // remove previous alert
        this.removePrevAlert();

        // create new alert
        this.createNewAlert(state, msg);
    }
}
