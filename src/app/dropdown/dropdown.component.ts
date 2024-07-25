import { Component } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  genders: GenderItem[] = [];
  bloodGroups: BloodGroupItem[] = [];
  selectedGender: string = '';
  selectedBloodGroup: number = 0;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    // Fetch authentication token
    this.apiService.getAuthToken().subscribe({
      next: (tokenResponse) => {
        const token = tokenResponse.ManikJSon?.[0]; // Extract token from response

        if (token) {
          // Fetch form data using the token
          this.apiService.getFormData(token).subscribe({
            next: (dataResponse) => {
              // console.log('dataResponse:', dataResponse);
              // Extract and process data
              const manikJson = dataResponse.ManikJSon || [];
              if (manikJson.length > 0) {
                const json0 = manikJson[0].JSon0 || [];
                const json1 = manikJson[0].JSon1 || [];
                // Map json0 and json1 data to gender and blood group options
                this.genders = json0.map((item: any) => ({
                  value: item.DataValue,
                  text: item.DataText,
                }));

                this.bloodGroups = json1.map((item: any) => ({
                  value: item.DataValue,
                  text: item.DataText,
                }));
              }
            },
            error: (error) => {
              console.error('Error fetching form data:', error);
            },
          });
        } else {
          console.error('Token is not available');
        }
      },
      error: (error) => {
        console.error('Error fetching authentication token:', error);
      },
    });
  }

  // Method to handle changes in dropdown values
  selectValue(e: any, type: string) {
    switch (type) {
      case 'Gender':
        this.selectedGender = e.target.value;
        break;
      case 'Bloodgroup':
        this.selectedBloodGroup = e.target.value;
        break;
      default:
        console.error('Unknown type:', type);
        break;
    }
  }
}

interface GenderItem {
  value: string;
  text: string;
}

interface BloodGroupItem {
  value: number;
  text: string;
}
