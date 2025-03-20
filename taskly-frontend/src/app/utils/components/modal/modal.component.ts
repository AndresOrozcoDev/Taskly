import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() title: string = 'Modal Title';
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  readonly icons = {
    plus: Plus,
  };

  close() {
    this.closeModal.emit();
  }
}
